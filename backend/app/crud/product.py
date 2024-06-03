from sqlalchemy.orm import Session

from app.models import Product
from app.schemas import ProductInDB

################
# Products table #
################

def create_product(db: Session, product: ProductInDB) -> Product:
    db_product = Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def get_product_by_id(db: Session, product_id: int) -> Product:
    return db.query(Product).filter(Product.id == product_id).first()

def get_all_products(db: Session) -> list[Product]:
    return db.query(Product).all()

def delete_product_by_id(db: Session, product_id: int):
    product = get_product_by_id(db, product_id)
    if product:
        db.delete(product)
        db.commit()