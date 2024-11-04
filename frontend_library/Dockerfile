FROM node:alpine AS build

COPY wait-for-it.sh /wait-for-it.sh
RUN ["chmod", "+x", "/wait-for-it.sh"]
RUN ls -l /wait-for-it.sh
COPY package.json package.json
RUN npm install
COPY . .

RUN apk add --no-cache bash && /wait-for-it.sh backend:8000 -- npm run build

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /out /usr/share/nginx/html
COPY --from=build nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000

CMD ["nginx","-g","daemon off;"]