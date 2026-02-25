FROM node:20
WORKDIR /calc
COPY cal.html .
COPY server.js .
EXPOSE 5000
CMD ["node","server.js"]