FROM node:16.16.0-alpine

COPY ./ /app

WORKDIR /app
RUN apk update

RUN set -xe \
    && npm ci 
    
RUN rm -rf dist \
    && npx webpack
