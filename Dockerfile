FROM node:8.4.0
ADD ./frontend /usr/src/app
WORKDIR /usr/src/app
RUN  npm i
EXPOSE 3000
CMD ["npm run", "dev"]