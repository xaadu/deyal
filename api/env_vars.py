import os

DEBUG=os.environ.get('DEBUG', 'FALSE') == 'TRUE'
MONGODB_CONNECTION_STRING=os.environ.get('MONGODB_CONNECTION_STRING')
MONGODB_DB_NAME=os.environ.get('MONGODB_DB_NAME')
