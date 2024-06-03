from pydantic import AnyHttpUrl, Field, EmailStr, validator, BaseModel


from phonenumbers import (
    parse as parse_phone_number,
    is_valid_number,
    NumberParseException,
    format_number,
    PhoneNumberFormat
)


def check_phone_number_string(phone_number: str) -> str:
    try:
        number = parse_phone_number(phone_number)
    except NumberParseException as e:
        raise ValueError('Parse error, phone number could not be parsed') from e

    if not is_valid_number(number):
        raise ValueError('Validation error, phone number is not valid')

    return format_number(number, PhoneNumberFormat.E164)


class TokenPayload(BaseModel):
    user_id: int
    is_email_verified: bool = False
    is_active: bool = True


class Token(BaseModel):
    access_token: str

class Email(BaseModel):
    email: EmailStr


class PhoneNumber(BaseModel):
    phone_number: str

    @validator('phone_number')
    def check_phone_number(cls, value):
        return check_phone_number_string(value)
    
class Completion(BaseModel):
    token: str = Field(..., min_length=32, max_length=32)
    phone_code: str = Field(..., min_length=4, max_length=4)

    @validator('phone_code')
    def check_code(cls, value):
        if not value.isdigit():
            raise ValueError('Validation error, code must be 4 characters')
        if int(value) < 1 or int(value) > 9999:
            raise ValueError('Validation error: code must be integer between 1 and 9999')

        return value