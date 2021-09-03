from node:14.17.5
WORKDIR /app
EXPOSE 3000
CMD npm install -l; npm start
