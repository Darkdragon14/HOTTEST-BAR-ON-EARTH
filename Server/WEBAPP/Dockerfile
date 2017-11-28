FROM node
#Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
#Install app dependencies
<<<<<<< HEAD
COPY package.json /usr/src/app/
RUN npm install
=======
#COPY package.json /usr/src/app/
#RUN npm install
>>>>>>> bc8d33cca25dd9e0beac3e9e4f6a319e1ca543b8
#Bundle app source
COPY . /usr/src/app

CMD [ "node", "webapp.js" ]
