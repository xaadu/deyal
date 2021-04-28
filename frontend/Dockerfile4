FROM node:alpine

RUN mkdir /code
COPY ./build /code
WORKDIR /code

RUN npm install -g serve

CMD ["serve", "-l", "tcp://0.0.0.0:9001"]
