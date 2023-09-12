# syntax=docker/dockerfile:1

FROM node:18.4.0
# ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

RUN npm run build

# ENV DB_NAME=${dbName}
# ENV DB_URI=${dbUri}
# RUN npm run createdatabase

CMD [ "npm", "run", "start" ]