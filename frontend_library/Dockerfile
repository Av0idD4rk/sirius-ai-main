FROM node:alpine AS build

COPY package.json package.json
RUN npm install

COPY . .

RUN npx tailwindcss -o build.css --minify && npm run build
RUN npm i serve
EXPOSE 3000
CMD ["npx","serve@latest","out"]