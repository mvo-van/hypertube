FROM node:22.16.0-slim

WORKDIR /api

RUN apt update && apt upgrade -y \
    && apt install -y curl procps ffmpeg \
    && apt clean \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install
RUN npm i -g @nestjs/cli

COPY . .

CMD ["npm", "run",  "start:dev", "--", "-b", "swc"]
