FROM node
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY nightadvisor.js .
EXPOSE 3000
CMD [ "npm", "start" ]