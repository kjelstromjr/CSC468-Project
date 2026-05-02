FROM node

WORKDIR /app

COPY . .

RUN npm install

RUN chown -R node:node /app

# Switch to non-root user
USER node