import json

from redis import asyncio as Redis
from fastapi import HTTPException, status

from app.schemas import (
    UserCreateForm,
    UserCreateForm,
    ParentCreateForm,
    SchoolStudentCreateForm,
    StudentCreateForm
)
from app.config import global_settings as settings

async def get_user_from_cache(redis: Redis, token: str):
    user = await redis.get(token)

    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail='registration form does not exist in cache')

    user = json.loads(user)
    return UserCreateForm(**user)