FROM node:16.16.0-alpine

COPY ./ /app

WORKDIR /app

ARG CACHE_DATE=2023-01-01

RUN apk update

RUN set -xe \
    && npm ci
     
    
RUN rm -rf dist \
    && npx webpack

WORKDIR /dist
VOLUME ["/dist"]
