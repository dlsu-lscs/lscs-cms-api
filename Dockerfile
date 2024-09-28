# prod build, better to multi-stage build
FROM node:22.4-alpine
ENV NODE_ENV=production

WORKDIR /api
COPY package*.json .
RUN npm ci
COPY . .
EXPOSE 3500

CMD [ "npm", "run", "start" ]
