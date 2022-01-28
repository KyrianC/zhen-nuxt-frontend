FROM node:16.13.2-alpine
    MAINTAINER KyrianC <ckyrian@protonmail.com>

WORKDIR /zhen-web-client

RUN apk update && apk upgrade
RUN apk add git

COPY package.json package-lock.json ./
RUN npm install

EXPOSE 3000

ENV NUXT_HOST=0
ENV NUXT_PORT=3000

COPY . ./
