import pymongo
from bson.objectid import ObjectId

# Only need to import for just running this file seperately because of loading the environment variables
# import helpers

from env_vars import (
    MONGODB_CONNECTION_STRING,
    MONGODB_DB_NAME
)


class DatabaseManager:
    def __init__(self) -> None:
        # Connect
        client = pymongo.MongoClient(MONGODB_CONNECTION_STRING)
        db = client.get_database(MONGODB_DB_NAME)

        # Collections
        self.posts = db.posts

        # Local Connection for not calling every request
        self.num_of_post = self.posts.count_documents({})

    def post_count(self) -> int:
        try:
            num_of_post = self.posts.count_documents({})
            self.total_post = num_of_post
            return num_of_post
        except Exception as e:
            print(e)
        return None

    def get_post(self, post_id: str) -> dict:
        try:
            post_id = ObjectId(post_id)

            try:
                post = self.posts.find_one({'_id': post_id})
                if post is not None:
                    post['_id'] = post['_id'].__str__()
                    data = {
                        'status': 'success',
                        'data': post
                    }
                else:
                    data = {
                        'status': 'failed',
                        'reason': 'No data found with this specific ID'
                    }
            except Exception as e:
                data = {
                    'status': 'failed',
                    'reason': str(e)
                }
        except Exception as e:
            data = {
                'status': 'falied',
                'reason': 'Invalid ID'
            }
        return data

    def get_posts(self, limit: int = 0, start: int = 0) -> dict:
        try:
            posts = list(self.posts.find(skip=start, limit=limit).sort(
                '_id', pymongo.DESCENDING))

            for post in posts:
                post['_id'] = post['_id'].__str__()

            total_post = self.post_count()

            metadata = {
                'total_post': total_post,
                'post_returned': len(posts),
                'started_from': start
            }

            data = {
                'status': 'success',
                'data': posts,
                'metadata': metadata
            }
        except Exception as e:
            data = {
                'status': 'failed',
                'reason': str(e)
            }

        return data

    def create_post(self, post_data: dict) -> dict:
        try:
            data = self.posts.insert_one(post_data)
            if data is not None:
                inserted_id = data.inserted_id
                data = self.posts.find_one({'_id': inserted_id})
                data['_id'] = data['_id'].__str__()
                data = {
                    'status': 'success',
                    'data': data
                }
            else:
                data = {
                    'status': 'failed',
                    'reason': 'Post Could not be Created in Database!'
                }
        except Exception as e:
            data = {
                'status': 'failed',
                'reason': str(e)
            }
        return data

    def remove_post(self, post_id: str) -> dict:
        try:
            post_id = ObjectId(post_id)
            try:
                data = self.posts.delete_one({'_id': post_id})
                if data is not None:
                    if data.deleted_count == 1:
                        data = {
                            'status': 'success',
                            'data': {}
                        }
                    else:
                        data = {
                            'status': 'failed',
                            'reason': 'Might be wrong ID'
                        }
                else:
                    data = {
                        'status': 'failed',
                        'reason': 'Something Blew Up'
                    }
            except Exception as e:
                data = {
                    'status': 'failed',
                    'reason': str(e)
                }
        except Exception as e:
            data = {
                'status': 'falied',
                'reason': 'Invalid ID'
            }
        return data


def test_db():
    dm = DatabaseManager()

    #count = dm.post_count()
    # print(count)
    # print('='*10)

    #posts = dm.get_posts(3, 2)
    # print(posts)
    # print('='*10)

    #test_id = posts['data'][-1]['_id']
    #test_id = '608a7dcbf956f9acb2e7879'
    #post = dm.get_post(test_id)
    # print(post)
    # print('='*10)

    #post = dm.create_post({'title': 'Test Post 6'})
    # print(post)
    # print('='*10)

    #post = dm.remove_post('608a7dcbf956f9acb2e78795')
    # print(post)
    # print('='*10)

# test_db()
