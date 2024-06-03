
from app.schemas import (
    Email,
    PhoneNumber
)

def is_email(value: str) -> bool:
    try:
        Email(email=value)
        return True
    except ValueError:
        return False


def is_phone_number(value: str) -> bool:
    try:
        PhoneNumber(phone_number=value)
        return True
    except ValueError:
        return False

