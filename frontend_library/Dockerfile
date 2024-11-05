FROM node:alpine AS build

COPY package.json package.json
RUN npm install

COPY . .

RUN npx tailwindcss -o build.css --minify && npm run build

FROM nginx:stable-alpine

COPY --from=build /out /usr/share/nginx/html
COPY --from=build nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000

CMD ["nginx","-g","daemon off;"]