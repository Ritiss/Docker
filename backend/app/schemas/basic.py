from pydantic import validator, BaseModel

class UserProfileInDB(BaseModel):
    user_id: int
    name: str
    email: str
    creation_time: str

    class Config:
        orm_mode = True

class UserInDB(BaseModel):
    user_id: int | None = None
    email: str
    hashed_password: str


class UserCreateForm(UserProfileInDB):
    user_id: int | None = None
    creation_time: str | None = None
    password: str
    confirm_password: str

    @validator('confirm_password')
    def match_passwords(cls, value, values):
        if 'password' in values and value != values['password']:
            raise ValueError('passwords do not match')
        return value

    class Config:
        schema_extra = {
            'example': {
                'name': 'Имя',
                'email': 'user@example.com',
                'password': 'string',
                'confirm_password': 'string'
            }
        }


class InitRegistrationResponse(BaseModel):
    token: str
    ucaller_id: int


class ExistedConflicts(BaseModel):
    email: bool
    phone_number: bool

    def is_empty(self):
        return not any((self.email, self.phone_number))

