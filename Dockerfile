ARG NODE_VERSION=14

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY package*.json .env .eslintrc *.js ./

COPY src ./src/

COPY public ./public/

RUN npm install && npm cache clear --force && npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
