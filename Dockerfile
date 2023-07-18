
FROM node:latest
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
# CMD ["npm", "run", "start"]
