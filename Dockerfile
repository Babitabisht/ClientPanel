FROM node:alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN  npm install -g @angular/cli@9.1.9
RUN ["npm","run","build"]
FROM nginx
WORKDIR /app
EXPOSE 80
COPY --from=builder /app/dist/clientPanel   /usr/share/nginx/html
 