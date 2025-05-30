FROM node:22.16.0-slim

WORKDIR /api

COPY package*.json ./
RUN npm install
RUN npm i -g @nestjs/cli

COPY . .

CMD ["npm", "run",  "start:dev", "--", "-b", "swc"]