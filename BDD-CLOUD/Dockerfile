FROM node
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY serveur.js .
COPY Chat.html .
COPY site.html .
COPY Chat_files .
COPY bootstrap .
EXPOSE 3000
CMD [ "npm", "start" ]