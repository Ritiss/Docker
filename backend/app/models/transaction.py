from sqlalchemy import Boolean, Column, Integer, String, Enum, ARRAY

from app.database import Base


class Transaction(Base):
    __tablename__ = 'transactions'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, index=True)
    status = Column(String)
    items = Column(ARRAY(Integer))
