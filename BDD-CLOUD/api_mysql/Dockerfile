
FROM node
RUN mkdir -p /usr/src/node
WORKDIR /usr/src/node
COPY package.json /usr/src/node/
RUN npm install
COPY . /usr/src/node
EXPOSE 3030
CMD [ "node", "api_mysql.js" ]

