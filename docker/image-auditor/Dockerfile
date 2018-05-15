FROM node:latest

MAINTAINER Oussama Lagha <oussama.lagha@heig-vd.ch>


COPY Auditor.js /opt/res/

WORKDIR /opt/res/

RUN npm install

ENTRYPOINT ["node", "/opt/res/Auditor.js"]