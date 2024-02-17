# Build Stage
FROM node:lts-alpine AS base

WORKDIR /app
COPY package*.json ./
COPY ./src/prisma ./src/prisma/

RUN npm install

# Production Run Stage
FROM node:lts-alpine
ENV NODE_ENV=production

WORKDIR /app
COPY --from=base /app/package*.json ./
COPY --from=base /app/node_modules ./node_modules
COPY ./src ./src
COPY ./start-app.sh ./

RUN chown -R node /app
USER node

EXPOSE 3000
CMD ["./start-app.sh"]
# CMD ["npm", "run", "start:deploy:seed:prod"]
