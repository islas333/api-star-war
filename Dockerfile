FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g ts-node

COPY . .

RUN npm run build

EXPOSE 3005:3002

CMD ["npm", "run", "dev"]