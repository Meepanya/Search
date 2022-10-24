FROM node:lts-alpine

RUN apk add --no-cache bash

COPY package.json /app/
RUN cd /app && \
    npm install --legacy-peer-deps

COPY . /app
WORKDIR /app

CMD npm run dev