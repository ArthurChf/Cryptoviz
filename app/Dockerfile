FROM node:20.11.0-alpine
RUN npm install -g npm@10.4.0
WORKDIR /app
USER node
COPY --chown=node:node package.json package-lock.json* ./
COPY --chown=node:node . .
RUN chmod +x app-entrypoint.sh
ENTRYPOINT ["sh", "app-entrypoint.sh"]