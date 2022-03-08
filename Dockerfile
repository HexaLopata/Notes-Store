FROM python:3.8-alpine

WORKDIR /notes_store

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY ./Notes-Store /notes_store

RUN apk add --update --no-cache --virtual .tmp-build-deps \
    gcc libc-dev linux-headers postgresql-dev npm && \
    pip install --no-cache-dir -r /notes_store/requirements.txt && \
    cd frontend && \
    npm install && \
    npm run build
