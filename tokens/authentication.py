import jwt, datetime 
from rest_framework.exceptions import AuthenticationFailed
def create_token_access(id):
    return jwt.encode({
        "id_user": id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(seconds=60),
        'iat': datetime.datetime.utcnow() 
    }, "access_secret", algorithm="HS256")
def create_refresh_access(id):
    return jwt.encode({
        "id_user": id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=14),
        'iat': datetime.datetime.utcnow() 
    }, "access_secret", algorithm="HS256")

def decode_tore_access(token):
    try: 
        payload = jwt.decode(token, "access_secret", algorithms="HS256")
        return payload['id_user']
    except: 
        raise AuthenticationFailed("Invalid Authenticated")