FROM node:16.14-bullseye-slim

WORKDIR /home/backend

COPY ../../ .

RUN npm install -g nodemon \
    npm install -g typescript \
    npm install

CMD [ "nodemon", "./build/index.js" ]