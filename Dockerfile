from node:12.16.1

ADD ./package.json /tmp/

RUN cd /tmp/ && npm install

Add ./ /code/

RUN cp -r /tmp/node_modules/ /code/

EXPOSE 5000

WORKDIR /code

ENTRYPOINT [ "node", "server.js" ]