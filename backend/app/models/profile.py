from sqlalchemy import Column, Integer, String, Enum, Float, DateTime
from app.database import Base

class UserProfile(Base):
    __tablename__ = 'user_profile'

    user_id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    creation_time = Column(DateTime)

