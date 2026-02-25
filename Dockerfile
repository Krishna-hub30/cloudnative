FROM node:20
WORKDIR /calc
COPY index.html .
COPY server.js .
EXPOSE 5000
CMD ["node","server.js"]