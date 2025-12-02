FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json .
RUN npm ci --only=production

RUN npm i pm2 -g

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "serve"]