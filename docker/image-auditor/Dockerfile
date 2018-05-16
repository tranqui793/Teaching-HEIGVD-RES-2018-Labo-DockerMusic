FROM node:latest

MAINTAINER Oussama lagha <oussma.lagha@heig-vd.ch>

#
# When we build the image, we copy the executable jar in the image file system. 
#
COPY src /opt/res/

WORKDIR /opt/res/

RUN npm install

ENTRYPOINT ["node", "/opt/res/auditor.js"]
