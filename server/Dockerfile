FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Keep container port consistent with app's PORT (3008)
EXPOSE 3008

CMD ["node", "server.js"]