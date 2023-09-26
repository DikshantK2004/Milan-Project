import firebase_admin
from firebase_admin import db


cred = firebase_admin.credentials.Certificate('/home/dikshant/Projects/Milan-Project/laptop_review/service.json')

firebase_admin.initialize_app(cred,
 { 'databaseURL': 'https://laptops-39b36-default-rtdb.firebaseio.com/'})

ref = db.reference('/')


import json
with open("book.json", "r") as f:
	file_contents = json.load(f)
ref.set(file_contents)
