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
nltk.download('all')
import stanza
stanza.download('en')
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
# Create a stanza pipeline
nlp = stanza.Pipeline()

stop_words = set(stopwords.words('english'))  #here we segment data , so we need those categories
# predictor = ktrain.load_predictor('predictor')

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

#location db.collection('laptops).document(review.laptop) this location contains 10 fields which are to be updated , not set, but i don't remeb=mber the syntax of update, so please check firestore docs or just write formula
#10 nahi 12
# checking all the collections in database
collections = db.collections()
collections = [collection.id for collection in collections]
print(collections)


@app.get('/')
async def route():
    return {"message" :  'Still working' }

@app.post('/new_review')
def post_new_review(review: Review):
    laptop = review.laptop
    predictor = ktrain.load_predictor('predictor')
    if laptop not in collections:
        return {"alert" : False, "message" : f"{laptop} is not in database."}

    # uid = utils.verify_id_token(review.token)
    
    # if uid == None:
    #     return {"alert" : False, "message" : "Token verification failed."}
    
    
    # if uid != review.user_id:
    #     return {"alert" : False, "message" :"Token not authenticated with user."}


    positive_score = predictor.predict(review.review)
    aspect_scores = utils.get_aspect_scores(review.review)
    tag_values = [(key, value) for (key,value) in aspect_scores if value!=-1]
    db.collection("laptops").document(laptop).collection("reviews").document(review.user_id).set({"username" : review.username, "review" : review.review, "score": positive_score, "tags": tag_values})

    doc_ref = db.collection('laptops').document(laptop)
    doc = doc_ref.get()
    doc_dict = doc.to_dict()
    doc_dict['score'] = utils.new_average(doc_dict['score'], positive_score, doc_dict['count'])
    doc_dict['count'] += 1
    for key in tag_values.keys():
        doc_dict[key] = utils.new_average(doc_dict[key+'_score'], tag_values[key], doc_dict[key+'_count'])
        doc_dict[key+'_count'] += 1
    doc_ref.set(doc_dict)
    return {"alert": True}


@app.get('/{laptop}')
def get_reviews(laptop:str):
    if laptop not in collections:
        return {"alert" : False, "message" : f"{laptop} is not in database."}
    
    docs = db.collection(laptop).get()
    print(docs)
    temp = []
    for doc in docs:
        temp.append(doc.to_dict())
        
    sorted_data = sorted(temp, key = lambda data: data['score'])
    
    for data in sorted_data:
        data['score'] = utils.convert_to_rating(data['score'])
        
    pos_data = []
    neg_data = []
    
    for data in sorted_data:
        if data['score'] <= 2.5 :
            neg_data.append(data)
        else:
            pos_data.append(data)
    
    pos_data.reverse()
    
    return {"alert" : True, "positive" : pos_data, "negative" : neg_data}
    