# CSC468-Project

## Overview
This project will server as a simple application that handles employee hours. Hours can be put in using an employee's name and the amount of hours worked. These hours will be stored in a SQL database on the backend. The entire project will be deployable through a Docker container, and will be able to be lauched on CloudLab.

## Vision
<img width="520" height="220" alt="CSC 468 Project (2)" src="https://github.com/user-attachments/assets/2536f284-e887-4192-ae1f-31350da07840" />

## Proposal
 - container 1
     - image: node
     - purpose: serve static files and handle REST API
 - container 2
     - image: PostgreSQL
     - purpose: database for employee hours
 - connection: TCP

## Build Process
> Below is an outline of the purpose of each line in the Dockerfile for the node container

* `FROM node` - Gets the latest node image

* `WORKDIR /app` - Sets the current working directory to app

* `COPY . .` - Copies the current working diretory of the computer into the current working directory of the container

* `RUN npm install` - Sets up the node packages

## Networking
All of the networking for this project is setup by docker compose using `docker-compose.yaml`. Each of the created containers are put into a unique bridge network. The containers can then communicate with one another via DNS resolution by the container name. For this project there is only one connection within the network and that is between the node and PostGres containers via TCP.
