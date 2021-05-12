import os

# DEBUG MODE
DEBUG = os.environ.get('DEBUG', 'FALSE') == 'TRUE'

# DATABASE
MONGODB_CONNECTION_STRING = os.environ.get('MONGODB_CONNECTION_STRING')
MONGODB_DB_NAME = os.environ.get('MONGODB_DB_NAME')

# SETTINGS
NUM_OF_DATA_PER_PAGE = int(os.environ.get('NUM_OF_DATA_PER_PAGE'))

# REDIS CACHE
REDIS_HOST = os.environ.get('REDIS_HOST')
REDIS_PORT = os.environ.get('REDIS_PORT')
REDIS_DB = int(os.environ.get('REDIS_DB'))
