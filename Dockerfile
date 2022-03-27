FROM node

WORKDIR /app

COPY /server/package.json  .

RUN cd server && yarn install && yarn build

COPY . .

EXPOSE 443

CMD ["node", "server/build/index.js"]