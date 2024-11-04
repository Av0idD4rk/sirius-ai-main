FROM node:alpine as build

COPY package.json package.json
RUN npm install
COPY . .
RUN npm build

FROM nginx:stable-alpine

COPY --from=build /out /usr/share/nginx/html
COPY --from=build ngin.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000

CMD ["nginx","-g","daemon off;"]