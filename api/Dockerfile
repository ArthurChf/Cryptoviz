FROM node:18.16.0-alpine
RUN npm install -g npm@9.8.1 && npm i -g @nestjs/cli
WORKDIR /nest_api
ENTRYPOINT ["sh", "api-entrypoint.sh"]