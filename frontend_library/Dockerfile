FROM node:alpine AS build

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
RUN npm i serve
EXPOSE 3000
CMD ["npx","serve@latest","out"]