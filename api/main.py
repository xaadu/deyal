from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

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

# Create DatabaseManager Object
dm = DatabaseManager()


@app.get('/')
async def home(request: Request):
    client_ip = getIP(request)
    return {'ip': client_ip}


@app.get('/posts')
async def posts(request: Request, page: int = 1):
    if page<1:
        page=1
    start = (page-1) * NUM_OF_DATA_PER_PAGE
    data = dm.get_posts(NUM_OF_DATA_PER_PAGE, start)
    return data
