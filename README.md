<img width="2556" height="1270" alt="Screenshot 2026-05-02 140637" src="https://github.com/user-attachments/assets/6e38ece9-e532-4a09-91fa-525b1e7015e2" />
<img width="2553" height="1270" alt="Screenshot 2026-05-02 135904" src="https://github.com/user-attachments/assets/1eca05c1-e3d2-4909-ad16-aaeb77aadf29" />
# CSC468-Project

## Overview
This project implements a simple to use managment platform for employees and hours worked. The project is designed to be able to be deployed to a cloud environment via GitHub Actions and CloudLab. All containers are built and run using Docker and all images are pushed to Docker Hub

## Application Overview
There are two main ways that this system can be used. As an admin, and as a user. Admins have full access to all information and capabilites in the system including managing employees, hours, and users.


## Deployment
> Note that this project does not need to be deployed on CloudLab and can be run on any system with Docker

### Simple
To lauch this project on any machine for testing or single use purposes run:
```bash
docker compose up -d
```

### Cloud
Follow these steps to deploy to a cloud environment. For this outline, we will be using CloudLab

1. Start up an experiment on CloudLab using files from a copied version of this repository.
2. Grab personal access tokens from Docker hub and store them in the secrets of your Github repo. Name them as `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN`
3. SSH into the CloudLab environment and add the server as a runner in GitHub Actions.
4. Push any code and watch it deploy!
5. The application is now available at port `8080`



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
