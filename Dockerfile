FROM node:16.10.0

WORKDIR /app

COPY . .

RUN yarn install

EXPOSE 3000

CMD yarn build && npm install serve && yarn serve
