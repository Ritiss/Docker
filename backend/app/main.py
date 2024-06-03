import asyncio
import secrets
from datetime import datetime

import aiofiles
import requests
from fastapi import (Body, Depends, FastAPI, HTTPException,
                    Query, Request, status)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from httpx import AsyncClient
import sqlalchemy.exc
from sqlalchemy.orm import Session
from typing import List
import fastapi_plugins
import os

import app.auth as auth

from app.validating import(
    is_email,
    is_phone_number
)

from app.schemas import (
    Token,
    TokenPayload,
    ProductInDB,
    UserProfileInDB,
    UserInDB,
    UserCreateForm,
    TransactionInDB,
    TransactionBase
)
from app.config import (
    global_settings,
    get_settings,
    Settings,
)

from app.dependencies import (
    get_active_user_token,
    get_db
)


from app.crud import (
    get_user_by_email,
    create_user,
    delete_user_by_id,
    delete_user_profile_by_id,
    create_user_profile,
    create_user,
    get_user_profile_by_id,
    create_product,
    get_product_by_id,
    get_all_products,
    delete_product_by_id,
    create_transaction,
    get_transaction_by_id,
    get_user_transactions,
    delete_transaction_by_id,
)

app = fastapi_plugins.register_middleware(
    app=FastAPI(
        docs_url=global_settings.DOCS_URL,
        redoc_url=None,
        openapi_url=global_settings.OPENAPI_URL
    ),
    middleware=[
        (
            CORSMiddleware,
            dict(
                allow_origins=["*"],
                allow_credentials=True,
                allow_methods=["*"],
                allow_headers=["*"]
            )
        )
    ]
)


##########
# Events #
##########

@app.on_event('startup')
async def startup_event():
    os.makedirs(global_settings.STORAGE_PATH, exist_ok=True)

############################
# Authentication endpoints #
############################


@app.post('/login', response_model=Token, tags=['Authentication'])
async def login_for_token(
        request: Request,
        db: Session = Depends(get_db),
        form: OAuth2PasswordRequestForm = Depends(),
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail='Incorrect credentials',
        headers={'WWW-Authenticate': 'Bearer'}
    )
    # Determine what login type was sent and get user by login
    if is_email(form.username) and not is_phone_number(form.username):
        user = get_user_by_email(db, form.username)


    else:
        raise credentials_exception

    # If user doesn't exist
    if user is None:
        raise credentials_exception

    # If wrong password
    if not auth.verify_password(form.password, user.hashed_password):
        raise credentials_exception

    client_host = request.client.host

    # Create and return token
    access_token = auth.encode_token(TokenPayload(**vars(user)))
    return {'access_token': access_token}

@app.post('/decode-token', response_model=TokenPayload, tags=['Authentication'])
async def decode_token(
        token_string: str = Body(...),
):
    token = auth.decode_token(token_string)
    return token


@app.get('/user/info', tags=['User management'])
async def get_user_info(
        token: TokenPayload = Depends(get_active_user_token),
        db: Session = Depends(get_db)
):
    user = get_user_profile_by_id(db, token.user_id)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'User with id={token.user_id} was not found')
    return user


@app.post('/complete-registration/user', response_model=Token, tags=['Registration'])
async def complete_user_registration(
        user: UserCreateForm,
        db: Session = Depends(get_db),
        settings: Settings = Depends(get_settings)
):
    # Check if the user already exists in the database
    existing_user = get_user_by_email(db, user.email)  # Implement this function in your code
    print("_+_+_++_+++_++_+_+__ existing_user", existing_user)
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='User already exists')

    # Create user
    print("_+_+_++_+++_++_+_+__ user",user)

    user_in_db = UserInDB(
        email=user.email,
        hashed_password=auth.get_password_hash(user.password)
    )
    print("_+_+_++_+++_++_+_+__ user_in_db", user_in_db)
    try:
        created_user = create_user(db, user_in_db)
    except sqlalchemy.exc.SQLAlchemyError:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail='User was not created due database error')

    # Get token for registered user
    async with AsyncClient() as client:
        url = f'{settings.HTTP}://{settings.HOST}:{settings.PORT}/login'
        data = {
            'username': created_user.email,
            'password': user.password
        }
        response = await client.post(url, data=data)

    token = Token(**response.json())

    # Create user_profile
    user_profile_in_db = UserProfileInDB(
        user_id=created_user.user_id,
        email=user.email,
        name=user.name,
        creation_time=datetime.utcnow().isoformat()
    )
    try:
        create_user_profile(db, user_profile_in_db)
    except sqlalchemy.exc.SQLAlchemyError:
        delete_user_by_id(db, created_user.user_id)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail='User profile was not created due database error')

    return token

@app.post('/product', response_model=ProductInDB, tags=['Products'])
def create_product_endpoint(product: ProductInDB, db: Session = Depends(get_db)):
    try:
        return create_product(db, product)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@app.get('/products/{product_id}', response_model=ProductInDB, tags=['Products'])
def get_product_by_id_endpoint(product_id: int, db: Session = Depends(get_db)):
    product = get_product_by_id(db, product_id)
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Product not found')
    return product

@app.get('/products', response_model=List[ProductInDB], tags=['Products'])
def get_all_products_endpoint(db: Session = Depends(get_db)):
    return get_all_products(db)

@app.delete('/products/{product_id}', tags=['Products'])
def delete_product_by_id_endpoint(product_id: int, db: Session = Depends(get_db)):
    product = get_product_by_id(db, product_id)
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Product not found')
    delete_product_by_id(db, product_id)
    return {"detail": "Product deleted"}

#########################
# Transactions endpoints #
#########################

@app.post('/transaction', response_model=TransactionInDB, tags=['Transactions'])
def create_transaction_endpoint(transaction: TransactionInDB, db: Session = Depends(get_db)):
    try:
        return create_transaction(db, transaction)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@app.get('/transactions/{transaction_id}', response_model=TransactionInDB, tags=['Transactions'])
def get_transaction_by_id_endpoint(transaction_id: int, db: Session = Depends(get_db)):
    transaction = get_transaction_by_id(db, transaction_id)
    if transaction is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Transaction not found')
    return transaction

@app.get('/user-transactions/{user_id}',  tags=['Transactions'])
def get_user_transactions_endpoint(user_id: int, db: Session = Depends(get_db) ):
    transactions = get_user_transactions(db, user_id)
    if not transactions:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='No transactions found for this user')
    return transactions

@app.delete('/transactions/{transaction_id}', tags=['Transactions'])
def delete_transaction_by_id_endpoint(transaction_id: int, db: Session = Depends(get_db)):
    transaction = get_transaction_by_id(db, transaction_id)
    if transaction is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Transaction not found')
    delete_transaction_by_id(db, transaction_id)
    return {"detail": "Transaction deleted"}