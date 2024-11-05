FROM node:alpine AS build

COPY package.json package.json
RUN npm install

COPY . .

RUN npx tailwindcss -o build.css --minify && npm run build

EXPOSE 3000
CMD ["npm","run","start"]