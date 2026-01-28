FROM artifactory.rakuten-it.com/docker-remote/node:20.9.0-bullseye

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin 

RUN mkdir -p "/home/node/.npm"
RUN chown -R 1000:1000 "/home/node"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app/

RUN echo "Hello from builder"

RUN npm install -g pnpm
