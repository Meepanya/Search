FROM node:lts-alpine

RUN apk add --no-cache bash

COPY package.json /web/
RUN cd /web && \
    npm install --legacy-peer-deps

COPY . /web
WORKDIR /web

EXPOSE 3000

CMD npm run start