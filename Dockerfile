FROM node:16-alpine

# initializes a working directory in the container
# it means that the commands below will be run in /app
# replaces the commands chain 'mkdir app && cd app'
WORKDIR /app

# setup deps
COPY package*.json ./
RUN npm install

# copies other files to the container
COPY . .

EXPOSE 8080

CMD ["npm", "start"]