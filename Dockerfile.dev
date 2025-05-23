FROM node:18.19.0-alpine

WORKDIR /app

RUN apk add --no-cache git openssh

COPY package.json package-lock.json* ./

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
