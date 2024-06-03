from httpx import AsyncClient
from fastapi import Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer

from app.database import SessionLocal
from app.config import Settings, get_settings
from app.schemas import TokenPayload

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='login')


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


async def get_active_user_token(
        token: str = Depends(oauth2_scheme),
        settings: Settings = Depends(get_settings)
) -> TokenPayload:
    async with AsyncClient() as client:
        token_url = (f'{settings.HTTP}://{settings.HOST}:{settings.PORT}'
                     f'/decode-token')
        response = await client.post(token_url, json=token)

    if response.status_code != status.HTTP_200_OK:
        raise HTTPException(status_code=response.status_code,
                            detail=response.json()['detail'])

    token_payload = TokenPayload(**response.json())
    return token_payload


async def get_active_user_token_as_string(
        token: str = Depends(oauth2_scheme),
        settings: Settings = Depends(get_settings)
) -> str:
    async with AsyncClient() as client:
        token_url = (f'{settings.HTTP}://{settings.HOST}:{settings.PORT}'
                     f'/decode-token')
        response = await client.post(token_url, json=token)

    if response.status_code != status.HTTP_200_OK:
        raise HTTPException(status_code=response.status_code,
                            detail=response.json()['detail'])

    return token