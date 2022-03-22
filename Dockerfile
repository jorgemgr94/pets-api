FROM node:16.13.1-alpine

WORKDIR /app

COPY package.json ./
RUN yarn install

ENV NODE_ENV=production

COPY . ./
RUN yarn run build

# EXPOSE 80
USER node
CMD ["node","./dist/index.js"]
