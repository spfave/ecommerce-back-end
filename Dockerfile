FROM node:lts-alpine
ENV NODE_ENV=production

WORKDIR /app
COPY ["package*.json", "./"]
COPY ["./src/prisma", "./src/prisma/"]
RUN npm install 

COPY ./src ./src

EXPOSE 3000
RUN chown -R node /app
USER node

CMD ["npm", "run", "start:prod"]
