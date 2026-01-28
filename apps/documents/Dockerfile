FROM artifactory.rakuten-it.com/docker-remote/node:20.9.0-bullseye

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app/

RUN npm install -g http-server

COPY apps/documents/out /usr/src/app

EXPOSE 8080

CMD ["http-server", "./"]
