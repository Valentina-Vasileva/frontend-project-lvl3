FROM node:16.16.0-alpine AS build
COPY ./ /app
WORKDIR /app
RUN set -xe && npm ci    
RUN rm -rf dist && npx webpack

FROM nginx
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./etc/nginx.conf /etc/nginx/nginx.conf
