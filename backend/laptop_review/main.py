import firebase_admin
from firebase_admin import db
import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
load_dotenv()
cred = firebase_admin.credentials.Certificate(os.path.dirname(__file__) + '/service.json')

firebase_admin.initialize_app(cred,
 { 'databaseURL': os.getenv('DATABASE_URL')})

ref = db.reference('/')

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

@app.get('/')
def route():
    return {"message" : "hello world"}