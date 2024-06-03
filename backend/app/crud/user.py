from sqlalchemy.orm import Session

from app.models import (
    User,
    UserProfile,
    User,
)
from app.schemas import (
    UserInDB,
    UserInDB,
    UserProfileInDB
)

###############
# Users table #
###############


def create_user(db: Session, user: UserInDB) -> User:
    db_user = User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def  create_user_profile(db: Session, user_profile:  UserProfileInDB) -> UserProfile:
    db_user_profile = UserProfile(**user_profile.dict())
    db.add(db_user_profile)
    db.commit()
    db.refresh(db_user_profile)
    return db_user_profile

def get_user_by_id(db: Session, user_id: int) -> User:
    return db.query(User).filter(User.user_id == user_id).first()

def get_user_profile_by_id(db: Session, user_id: int) -> UserProfile:
    return db.query(UserProfile).filter(UserProfile.user_id == user_id).first()


def get_user_by_email(db: Session, email: str) -> User:
    return db.query(User).filter(User.email == email).first()


def delete_user_by_id(db: Session, user_id: int):
    user = get_user_by_id(db, user_id)
    db.delete(user)
    db.commit()

def delete_user_profile_by_id(db: Session, user_id: int):
    user = get_user_profile_by_id(db, user_id)
    db.delete(user)
    db.commit()

