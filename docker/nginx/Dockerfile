FROM nginx
LABEL Description="nginx"

COPY ./etc/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx-entrypoint.sh /nginx-entrypoint.sh

RUN chmod +x /nginx-entrypoint.sh
ENTRYPOINT ["/nginx-entrypoint.sh"]

CMD ["nginx"]
