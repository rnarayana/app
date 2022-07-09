FROM nginx:1.21.0-alpine AS ui

WORKDIR /usr/share/nginx/html

RUN apk --no-cache add shadow && \
    usermod -u 1000 nginx && \
    groupmod -g 1000 nginx && \
    rm -rf /usr/share/nginx/html
RUN apk upgrade --no-cache --available
RUN ln -sf /dev/stdout /tmp/nginx_access.log && ln -sf /dev/stderr /tmp/nginx_error.log

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./build/ /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]