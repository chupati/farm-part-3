from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from pymongo import MongoClient
import os
from urllib.parse import quote_plus
from fastapi.middleware.cors import CORSMiddleware


origins = [
    "http://0.0.0.0:3000",
    "http://localhost:3000"
]


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
mongo_client = None


def get_client():
    """
    Setup a mongo client for the site
    :return:
    """
    global mongo_client
    if bool(mongo_client):
        return mongo_client
    host = os.getenv('MONGODB_HOST', '')
    username = os.getenv('MONGODB_USER', '')
    password = os.getenv('MONGODB_PASSWORD', '')
    port = int(os.getenv('MONGODB_PORT', 27017))
    endpoint = 'mongodb://{0}:{1}@{2}'.format(quote_plus(username),
                                              quote_plus(password), host)
    mongo_client = MongoClient(endpoint, port)
    return mongo_client


class ComicIssue(BaseModel):
    id: int
    number: str
    series_name: str
    on_sale_date: str
    price: str
    publisher_name: str


@app.get('/')
async def root():
    return {'message': 'Hello World'}


@app.get('/comics/{title}/{issue_number}', response_model=List[ComicIssue])
async def get_comic_issues(title: str, issue_number: str): 
    criteria = {'series_name': title, 'number': issue_number}
    client = get_client()
    db = client.farmdemo
    issues = db.issues.find(criteria)
    data = list()
    for issue in issues:
        data.append(ComicIssue(**issue))
    return data
