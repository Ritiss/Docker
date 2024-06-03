from functools import lru_cache

from .settings import Settings

global_settings = Settings()



@lru_cache
def get_settings():
    return Settings()

