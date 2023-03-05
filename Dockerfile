FROM node:16
# App directory
WORKDIR /app

# App dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Env setup
COPY .env.example .env

#Expose port and begin application
EXPOSE 5000

# Start the app
CMD [ "npm", "run", "start:dev"]