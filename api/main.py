from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from typing import Optional
from pydantic import BaseModel

from datetime import datetime

from helpers import (
    getIP
)
from env_vars import (
    NUM_OF_DATA_PER_PAGE
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
    data = dict(post)

    now = datetime.now()
    data['date'] = now.strftime("%B %d, %Y")
    data['time'] = now.strftime("%I:%M:%S %p")

    data = dm.create_post(data)

    return data
