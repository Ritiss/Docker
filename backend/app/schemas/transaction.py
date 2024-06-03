from pydantic import BaseModel
from typing import List

class TransactionBase(BaseModel):
    user_id: int
    items: List[int]
    status: str
class TransactionInDB(TransactionBase):
    id: int | None = None

    class Config:
        orm_mode = True