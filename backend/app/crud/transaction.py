from sqlalchemy.orm import Session

from app.models import Transaction
from app.schemas import TransactionInDB

######################
# Transactions table #
######################

def create_transaction(db: Session, transaction: TransactionInDB) -> Transaction:
    db_transaction = Transaction(**transaction.dict())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

def get_transaction_by_id(db: Session, transaction_id: int) -> Transaction:
    return db.query(Transaction).filter(Transaction.id == transaction_id).first()

def get_user_transactions(db: Session, user_id: int) -> list[Transaction]:
    return db.query(Transaction).filter(Transaction.user_id == user_id).all()

def delete_transaction_by_id(db: Session, transaction_id: int):
    transaction = get_transaction_by_id(db, transaction_id)
    if transaction:
        db.delete(transaction)
        db.commit()
