# 1. Use the official Node.js lightweight image
# Use Node 20 LTS instead of an unpinned/older version
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]