from typing import Any

from pydantic import BaseSettings, validator, PostgresDsn, Field, AnyHttpUrl


class Settings(BaseSettings):
    DOCS_URL: str | None = None
    OPENAPI_URL: str | None = None
    HTTP: str

    STORAGE_PATH: str = Field(...)

    CORS_ORIGINS: list[AnyHttpUrl]

    POSTGRES_SERVER: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    SQLALCHEMY_DATABASE_URI: PostgresDsn | None = None

    @validator("SQLALCHEMY_DATABASE_URI", pre=True)
    def assemble_db_connection(cls, v: str | None, values: dict[str, Any]) -> Any:
        if isinstance(v, str):
            return v

        return PostgresDsn.build(
            scheme="postgresql",
            user=values.get("POSTGRES_USER"),
            password=values.get("POSTGRES_PASSWORD"),
            host=values.get("POSTGRES_SERVER"),
            path=f"/{values.get('POSTGRES_DB') or ''}",
        )

    JWT_SECRET_KEY: str
    ACCESS_TOKEN_EXP_H: int
    REGISTRATION_TIMEOUT_SEC: int


    HOST: str
    PORT: int
    class Config:
        env_file = './app/.env'
        env_file_encoding = 'utf-8'
