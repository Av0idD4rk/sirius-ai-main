FROM node:alpine AS build

COPY package.json package.json
RUN npm install
RUN npm install serve

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npx","serve@latest","/out"]
