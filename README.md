# CSC468-Project

## Overview
This project implements a simple to use managment platform for employees and hours worked. The project is designed to be able to be deployed to a cloud environment via GitHub Actions and CloudLab. All containers are built and run using Docker and all images are pushed to Docker Hub

## Application Overview
There are two main ways that this system can be used. As an admin, and as a user. Admins have full access to all information and capabilites in the system including managing employees, hours, and users.
> Note that when an employee is deleted, all of the data accociated (users, hours) also gets deleted

<!-- <img width="2553" height="1270" alt="Screenshot 2026-05-02 135904" src="https://github.com/user-attachments/assets/1eca05c1-e3d2-4909-ad16-aaeb77aadf29" /> -->
<br><br>
Users are connected to a single employee and are only allowed to add and view hours for that specific employee.
<!-- <img width="2556" height="1270" alt="Screenshot 2026-05-02 140637" src="https://github.com/user-attachments/assets/6e38ece9-e532-4a09-91fa-525b1e7015e2" /> -->

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

#### CI/CD Flow
Whenever a push is made to the GitHub repository, the CI/CD workflow will run the following:

1. Setup Docker
2. Connect to Docker Hub
3. Build images
4. Push images to Docker Hub
5. Pull images on server
6. Update containers

## System Overview
### Containers
<img width="520" height="220" alt="CSC 468 Project (2)" src="https://github.com/user-attachments/assets/2536f284-e887-4192-ae1f-31350da07840" />

#### Node
The main container for this project is node. It runs the Node.js backend and creates and uses a connection with the SQL database. Express.js was chosen for the API management because of it's simplicity and flexability. All HTML files are sent as raw file rather than with a rendering engine since the project only uses three pages. The backend, however, is split up into a more managable structure. The backend is structured using a Model-View-Controller (MVC) layout to make development and understanding of the system better.

The container also installs all necessary npm packages for the project, which are stored in the Docker image.

#### PostgreSQL
The database is managed by a container running PostgreSQL. This was chosen for it's plug-n-play ability with it already being a well established system. The container runs an init script that creates the tables and adds an admin user with an employee and hours. There are three tables for this project. Each one represent one of the three main datapoints: employees, users, and hours. Take a look at the `init.sql` file in `postgres` for a more in-depth outline of the tables.

### Networking
All networking for this project is created by the docker compose file. Both containers are put into a docker network. Becuase of this, both containers can be accessed within the network via their container names. Only one port is exposed, 8080 for the node server. Users connect to the server via HTTP. Postgres runs on port 5432 and is only accessible inside the container. Database connections are made through TCP.

### Security
There are three layers of security built into this project.

The first is that both containers run on non-root users, albeit a litle differently. The node image comes with it's own non-root user, but you do have to explicitly say in the DockerFile to use that user. The postgres image also comes with it's own non-root user, however the server does need to run in admin for the inital setup. After which, the server automatically moves to a non-root user.

The second layer is the capabilites. This project follows a minimum required approach for the capabilites of each image. Node is given zero capabilites since it does not need any. Like mentioned previously, postgres has to do some setup initally as an admin. Therefore, some capabilites had to be given. These include `SETUID`, `SETGID`, `CHOWN`, `DAC_OVERRIDE`, and `FOWNER`. These are mainly needed for the setup of the files for storage and transitioning to a non-root user.
> Note here that DAC_OVERRIDE and FOWNER override certain privilages and can expose the application to certain dangers.

The third layer is simply not allowing additonal privilages to be set by either image.