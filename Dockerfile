# Use official Node.js base image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy dependency definition files to leverage Docker cache for dependencies
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy remaining application code, including prisma/schema.prisma file
COPY . .

# Generate Prisma Client after schema is present
RUN npx prisma generate

# Expose port 3000 for the application
EXPOSE 3000

# Define command to start the application in development mode
CMD ["npm", "run", "dev"]
