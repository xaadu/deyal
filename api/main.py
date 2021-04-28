from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from helpers import (
    getIP
)

APP_VERSION = '1'

ROOT_PATH=f'/deyal/v{APP_VERSION}'

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

@app.get('/')
async def home(request: Request):
    client_ip = getIP(request)
    return {'ip': client_ip}
