import firebase_admin
from firebase_admin import firestore, credentials
import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import pandas as pd
import ktrain

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

# positive and negative score predictor
predictor = ktrain.load_predictor('models')

# checking all the collections in database
collections = db.collections()
for collection in collections:
    print(collection.id)


@app.get('/')
async def route():
    return {"message" :  'Still working' }