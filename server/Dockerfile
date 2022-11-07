FROM node:16-alpine

# sets env variables for DynamoDB tokens
ENV DB_ACCESS_KEY_ID=AKIAZW2QYHMLK5WF4PH7 \
    DB_SECRET_ACCESS_KEY=TjH2tyVtUFa2RRsMR6ezv4x5Zugftf+QZxuCs+Yu

# initializes a working directory in the container
# it means that the commands below will be run in /app
# replaces the commands chain 'mkdir app && cd app'
WORKDIR /app/server

# setup deps
COPY package*.json ./
RUN npm install

# copies other files to the container
COPY . .

# allows frontend container to communicate with the server container using this port
# in other words it's useful at inter-container comminications
EXPOSE 3000

CMD ["npm", "start"]