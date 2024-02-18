FROM node:18-alpine
WORKDIR /app/backend
COPY package.json .
RUN npm install --force
COPY . ./
EXPOSE 5000
CMD ["npm", "run", "start"]