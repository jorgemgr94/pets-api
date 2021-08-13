FROM node:14.15.1

WORKDIR /app

COPY package.json ./ 
RUN yarn install

COPY . .
RUN yarn run build

# EXPOSE 80
CMD ["node","./dist/index.js"]