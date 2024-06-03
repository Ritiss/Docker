from datetime import datetime, timedelta

import jwt
from fastapi import HTTPException, status
from passlib.context import CryptContext

from app.schemas import TokenPayload
from app.config import global_settings as settings

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def encode_token(user: TokenPayload) -> bytes:
    payload = {
        'exp': datetime.utcnow() + timedelta(hours=settings.ACCESS_TOKEN_EXP_H),
        'iat': datetime.utcnow(),
        'scope': 'access_token',
    }
    payload.update(user)
    return jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm='HS256')


def decode_token(token: str) -> TokenPayload:
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=['HS256'])
        if payload['scope'] == 'access_token':
            return TokenPayload(**payload)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail='Scope for the token is invalid')
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail='Token expired')
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail='Invalid token')
