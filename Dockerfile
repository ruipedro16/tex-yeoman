FROM node:25-alpine

RUN npm install -g yo

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm link

RUN adduser -D yeoman && \
    mkdir -p /workspace && \
    chown -R yeoman:yeoman /workspace

USER yeoman

WORKDIR /workspace

CMD ["yo", "tex-yeoman"]
