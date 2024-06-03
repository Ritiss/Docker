from sqlalchemy import Boolean, Column, Integer, String, Enum

from app.database import Base


class Product(Base):
    __tablename__ = 'products'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String,  nullable=False)
    type = Column(String,  nullable=False)
    price = Column(Integer,  nullable=False)
    img = Column(String,  nullable=False)
    capacity = Column(Integer,  nullable=False)
    description = Column(String,  nullable=False)
    effect = Column(String,  nullable=False)
