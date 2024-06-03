from pydantic import BaseModel

class ProductBase(BaseModel):
    name: str
    type: str
    price: int
    img: str
    capacity: int
    description: str
    effect: str

class ProductInDB(ProductBase):
    id: int | None = None

    class Config:
        orm_mode = True
