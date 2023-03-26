FROM node:16-alpine

COPY . /auction-app

WORKDIR /auction-app

RUN yarn build

RUN yarn install

CMD ["yarn", "dev"]