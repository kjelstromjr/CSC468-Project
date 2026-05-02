FROM node

WORKDIR /app

COPY . .

RUN npm install

RUN chown -R node:node /app

USER node