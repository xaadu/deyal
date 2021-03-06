from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

import redis

from typing import Optional
from pydantic import BaseModel

from datetime import datetime

from helpers import (
    getIP
)
from env_vars import (
    NUM_OF_DATA_PER_PAGE,
    REDIS_HOST,
    REDIS_DB,
    REDIS_PORT
)

from DatabaseManager import DatabaseManager

APP_VERSION = '1'

ROOT_PATH = f'/deyal/v{APP_VERSION}'

app = FastAPI(
    title="Deyal App API",
    description="This is a small API Project For Deyal App",
    version=APP_VERSION,
)
app.mount(ROOT_PATH, app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Model


class Post(BaseModel):
    name: str
    description: str


# Create DatabaseManager Object
dm = DatabaseManager()

# Create Redis Client Object
redisClient = redis.Redis(REDIS_HOST, REDIS_PORT, REDIS_DB)


@app.get('/')
async def home(request: Request):
    client_ip = getIP(request)
    return {'ip': client_ip}


@app.get('/posts')
async def posts(request: Request, page: Optional[int] = 1, start: Optional[int] = None):
    if page < 1:
        page = 1
    if start is None:
        start = (page-1) * NUM_OF_DATA_PER_PAGE
        data = dm.get_posts(NUM_OF_DATA_PER_PAGE, start)
    else:
        data = dm.get_posts(page*NUM_OF_DATA_PER_PAGE, start)
    return data


@app.post('/posts')
async def create_post(request: Request, post: Post):
    client_ip = getIP(request)

    if redisClient.ttl(client_ip) != -2:
        data = {
            'status': 'failed',
            'issue_title': 'Limit Exceeded',
            'issue_description': 'You can post once in 5 minute! Please wait at least 5 minutes after posting.',
        }
        return data
    else:
        redisClient.setex(client_ip, 10, 'Posted')

    data = dict(post)

    if data.get('description') != None:
        if data.get('description') == '':
            data = {
                'status': 'failed',
                'issue_title': 'Empty Field',
                'issue_description': 'Description Field can\'t be empty. Write Something you want to post.',
            }
            return data
        elif len(data.get('description')) > 5000:
            data = {
                'status': 'failed',
                'issue_title': 'Limit Exceeded',
                'issue_description': 'Description can\'t be more than 5000 characters. Write within 5000 character.',
            }
            return data
    if data.get('name') != None:
        if len(data.get('name')) > 30:
            data = {
                'status': 'failed',
                'issue_title': 'Limit Exceeded',
                'issue_description': 'Name can\'t be more than 30 characters. Please write name within 30 characters.',
            }
            return data

    now = datetime.now()
    data['date'] = now.strftime("%B %d, %Y")
    data['time'] = now.strftime("%I:%M:%S %p")

    data = dm.create_post(data)

    return data
