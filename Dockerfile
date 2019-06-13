FROM node:8.4.0
ADD ./frontend /usr/src/app
WORKDIR /usr/src/app
RUN chmod  -R 777 node_modules
RUN rm -rf node_modules
RUN  npm i
EXPOSE 3000
CMD ["npm", "start"]