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

    uid = utils.verify_id_token(review.token)
    
    if uid == None:
        return {"alert" : False, "message" : "Token verification failed."}
    
    
    if uid != review.user_id:
        return {"alert" : False, "message" :"Token not authenticated with user."}


    positive_score = predictor.predict(review.review)
    
    db.collections(laptop).document(review.user_id).add({"username" : review.username, "review" : review.review, "score": positive_score})
    
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
    