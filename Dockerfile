FROM node:10-alpine
RUN npm i -g nodemon

RUN mkdir /app

WORKDIR /app

COPY . .

EXPOSE 3000

RUN npm i 

CMD ["nodemon", "index.js"]
