# Use an official Node runtime as a parent image
FROM node:22

# Set the working directory in the container
WORKDIR /usr/src/app

# Define build-time variables
ARG NODE_ENV

# Set environment variables using the build-time variables
ENV NODE_ENV=$NODE_ENV

# Copy package.json and package-lock.json
COPY services/webhook/package*.json ./

# Install dependencies
RUN npm install --include=dev

# Copy the rest of the application
COPY services/accounts/ ./

# Copy the shared lib directory
COPY lib/ ./src/lib

# Copy the shared utils directory
COPY utils/ ./src/utils

# Copy env file
COPY .env ./

# Install nodemon
RUN npm install -g nodemon

# Transpile the code
RUN npm run build

# Expose the port the app runs on (adjust if necessary)
EXPOSE 4001

# Define the command to run your app
CMD [ "sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then npm run dev; else npm run build && npm start; fi" ]