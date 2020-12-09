FROM node:alpine

WORKDIR /usr/app

COPY ./package.json ./

COPY yarn.lock ./

RUN yarn install --production

COPY ./ ./

EXPOSE 3001

USER node

CMD [ "yarn", "start" ]