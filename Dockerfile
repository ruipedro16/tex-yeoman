FROM node:25-alpine

RUN npm install -g yo

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm link

WORKDIR /workspace

ENTRYPOINT ["yo", "tex-yeoman", "--allow-root"]