FROM node:14.16.1-alpine

WORKDIR /app

COPY package.json ./
RUN yarn install

ENV NODE_ENV=production

COPY . ./
RUN yarn run build

# EXPOSE 80
CMD ["node","./dist/index.js"]
