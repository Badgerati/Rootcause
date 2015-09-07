FROM ubuntu:latest
COPY . /src
WORKDIR /src
EXPOSE 80
CMD while true ; do nc -l 80 < /src/index.html ; done