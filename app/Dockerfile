# Use the official Node.js image from the Docker Hub
FROM node:22

# Create and set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 8080

# Command to run the application
CMD ["npm", "start"]
