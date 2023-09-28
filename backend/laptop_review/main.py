import firebase_admin
from firebase_admin import firestore, credentials, auth
import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import pandas as pd
import ktrain
from models import Review
import utils
import nltk
import numpy as np
import stanza

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
# Create a stanza pipeline
nltk.data.path.append(os.path.dirname(__file__) + "/../nltk_data")
nlp = stanza.Pipeline(dir = os.path.dirname(__file__) + "/../stanza_resources")

stop_words = set(stopwords.words('english'))  #here we segment data , so we need those categories
predictor = ktrain.load_predictor('predictor')

load_dotenv()

cred = credentials.Certificate(os.path.dirname(__file__) + '/service.json')
firebase_admin.initialize_app(cred)


db = firestore.client()


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Getting all laptop names in database
laps = db.collection('laptops').stream()
laptops = [lap.id for lap in laps]
print(laptops)

# Getting the score predictor
predictor = ktrain.load_predictor('predictor')



@app.get('/')
async def route():
    return {"message" :  'Still working' }


# Adding a new laptop to database
@app.post('/createLaptop')
async def create_laptop(laptop:str):
    print("hello")
    path = db.collection('laptops').document(laptop)
    data = {}
    for key in utils.fields:
        data[key + '_score'] = -1
        data[key + '_count'] = 0
    data['score'] = -1
    data['image_url'] = ''
    data['count'] = 0
    print(data)
    path.set(data)
    return {"alert" : True}
    
    
@app.get('/score')
def getter():
    return {"alert" : "Don't think we are gonna make it"}


@app.get('/score/{laptop}')
async def get_laptop(laptop:str):
    if laptop not in laptops:
        return {"alert" : False, "message" : f"{laptop} not in database"}
    
    path = db.collection('laptops').document(laptop)
    
    data = path.get().to_dict()
    
    print(data)
    
    return {"alert" : True, "response" : data}
    
    


@app.post('/new_review')
def post_new_review(review: Review):
    laptop = review.laptop
    
    if laptop not in laptops:
        return {"alert" : False, "message" : f"{laptop} is not in database."}

    # uid = utils.verify_id_token(review.token)
    
    # if uid == None:
    #     return {"alert" : False, "message" : "Token verification failed."}
    
    
    # if uid != review.user_id:
    #     return {"alert" : False, "message" :"Token not authenticated with user."}


    positive_score = predictor.predict(review.review, return_proba = True)[1].item()
    aspect_scores = utils.get_aspect_scores(review.review, stop_words, nlp, predictor)
  
    
    for key in utils.fields:
        if type(aspect_scores[key]) == np.float32:
            aspect_scores[key] = aspect_scores[key].item()
    
    print(aspect_scores)
    
    now = utils.current_time()
    db.collection("laptops").document(laptop).collection("reviews").document(review.user_id).set({"username" : review.username, "review" : review.review, "score": positive_score, "tags": aspect_scores, "date": now})

    doc_ref = db.collection('laptops').document(laptop)
    doc = doc_ref.get()
    doc_dict = doc.to_dict()
    if doc_dict['score'] == -1:
        doc_dict['score'] = 0
    

    
    doc_dict['score'] = utils.new_average(doc_dict['score'], positive_score, doc_dict['count'])

    
    doc_dict['count'] += 1
    
    for key in aspect_scores:
        if aspect_scores[key] != -1:
            if doc_dict[key+'_score'] == -1:
                doc_dict[key+'_score'] = 0
            doc_dict[key+'_score'] = utils.new_average(doc_dict[key+'_score'], aspect_scores[key], doc_dict[key+'_count'])
            doc_dict[key+'_count'] += 1
    doc_ref.set(doc_dict)
    return {"alert": True}


# getting reviews for laptop
@app.get('/{laptop}')
def get_reviews(laptop:str):
    if laptop not in laptops:
        return {"alert" : False, "message" : f"{laptop} is not in database."}
    
    docs = db.collection('laptops').document(laptop).collection('reviews').get()
    temp = [doc.to_dict() for doc in docs]

        
    sorted_data = sorted(temp, key = lambda data: data['score'])
    
    for data in sorted_data:
        data['score'] = utils.convert_to_rating(data['score'])
        for field in utils.fields:
            if data['tags'][field] != -1:
                data['tags'][field] = utils.convert_to_rating(data['tags'][field])
            
    pos_data = []
    neg_data = []
    
    for data in sorted_data:
        if data['score'] <= 2.5 :
            neg_data.append(data)
        else:
            pos_data.append(data)
    
    pos_data.reverse()
    
    return {"alert" : True, "positive" : pos_data, "negative" : neg_data}
    