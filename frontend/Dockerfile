FROM node:16

RUN apt-get update -yqq && apt-get install -yqq --no-install-recommends

COPY package*.json /usr/src/app/

WORKDIR /usr/src/app

RUN npm install

COPY . /usr/src/app/

CMD ["npm", "start"]
