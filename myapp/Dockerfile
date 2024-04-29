FROM node:17-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npx react-native bundle


CMD ["npm", "start"]