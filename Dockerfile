# Base image
FROM node:21-alpine

# Create app directory
WORKDIR /app

# Copy package.json and yarn.lock (if using Yarn) to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm i

# Bundle app source code
COPY . .

# Build the NestJS application (assuming you have a build script)
RUN npm run build

# Start the server using the production build
CMD [ "npm", "start" ]
