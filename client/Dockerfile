FROM node:19-alpine

WORKDIR /app

COPY client/package.json /app/

RUN npm install --legacy-peer-deps

COPY client/ /app/

CMD ["npm", "run", "start"]
