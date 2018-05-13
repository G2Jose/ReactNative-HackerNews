FROM node:9-alpine
RUN apk add --no-cache git
COPY ./package.json /packages/package.json
RUN cd /packages/ && yarn
WORKDIR /code
RUN cp -a /packages/* /code/
COPY . /code
