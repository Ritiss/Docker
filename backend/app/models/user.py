from sqlalchemy import Boolean, Column, Integer, String, Enum

from app.database import Base


class User(Base):
    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True, index=True)
    email = Column(String)
    hashed_password = Column(String)

