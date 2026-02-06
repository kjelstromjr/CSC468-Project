# CSC468-Project

## Overview
The project will server as a simple application that handles employee hours. Hours can be put in using an employee's name and the amount of hours worked. These hours will be stored in a SQL database on the backend. The entire project will be deployable through a Docker container, and will be able to be lauched on CloudLab.

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
