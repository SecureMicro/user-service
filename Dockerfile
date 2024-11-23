FROM node:alpine-13
    COPY . .
    RUN npm install
    RUN npm run dev
    CMD [ "npm", 'run', 'start' ]