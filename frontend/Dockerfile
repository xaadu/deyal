FROM node:alpine

RUN mkdir /code
COPY . /code
WORKDIR /code

RUN npm install
RUN npm install -g serve

RUN npm run build

CMD ["serve", "-s", "build", "-l", "tcp://0.0.0.0:9002"]
