FROM node:latest
# Creating a new directory for app files and setting path in the container
RUN mkdir -p /usr/src/app
# setting working directory in the container
WORKDIR /usr/src/app
# copying the package.json file(contains dependencies) from project source dir to container dir
COPY package.json /usr/src/app
# installing the dependencies into the container
RUN npm i
# copying the source code of Application into the container dir
COPY . /usr/src/app
# build the project with tsc
RUN npm run build
# container exposed network port number
EXPOSE 8080
# command to run within the container
CMD ['node', './dist/index.js']