FROM node:16 AS dist

COPY package.json ./

RUN yarn install

COPY . ./

RUN yarn build:prod

FROM node:16 AS node_modules
COPY package.json ./

RUN yarn install --prod

FROM node:16

ARG PORT=3000

RUN mkdir -p /app

WORKDIR /app

COPY --from=dist dist /app/dist
COPY --from=node_modules node_modules /app/node_modules

COPY . /app

EXPOSE $PORT

CMD [ "yarn", "start:prod" ]
