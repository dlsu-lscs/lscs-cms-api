# prod build, better to multi-stage build
FROM node:22.4-alpine

WORKDIR /api
COPY package*.json .
RUN npm ci
COPY . .
EXPOSE 3500

CMD [ "npm", "run", "start" ]
