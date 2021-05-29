FROM node:16

RUN apt-get update -yqq && apt-get install -yqq --no-install-recommends

# Create and define the node_modules's cache directory.
WORKDIR /usr/src/cache

COPY package*.json /usr/src/cache/

RUN npm install

WORKDIR /usr/src/app

COPY . /usr/src/app/

CMD ["npm", "start"]
