# Шаг 1: установка зависимостей
FROM python:3.11-alpine as builder

WORKDIR /build

COPY ./requirements.txt requirements.txt

RUN pip install --no-cache-dir --upgrade -r requirements.txt


# Шаг 2: создание production образа
FROM python:3.11-alpine

WORKDIR /cyberslum_backend

COPY --from=builder /usr/local/lib/python3.11/site-packages/ /usr/local/lib/python3.11/site-packages/
COPY --from=builder /usr/local/bin/alembic /usr/local/bin/alembic
COPY --from=builder /usr/local/bin/uvicorn /usr/local/bin/uvicorn

COPY . .

EXPOSE 8000

CMD alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port 8000