FROM node:18

WORKDIR /usr/src/app

COPY *.json ./
RUN npm install
