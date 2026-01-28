FROM artifactory.rakuten-it.com/docker-remote/node:20.9.0-bullseye

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app/

RUN npm install -g http-server

COPY packages/scm/storybook-static /usr/src/app

EXPOSE 8080

RUN ls -la

CMD ["http-server", "./"]
