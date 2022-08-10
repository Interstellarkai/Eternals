# MERN Stack Course
---
## Learning Outcome
I have learnt how to use the MERN stack by building a Restaurant Reviews Web Application

## Course Objectives 
- Learn how to build a full stack web application using the MERN Stack 
- Convert the backend to serverless to host on MongoDB 
- Using the following resource from FreeCodeCamp \
https://www.youtube.com/watch?v=mrHNSanmqQ4&ab_channel=freeCodeCamp.org

# NOTES 

## MERN Stack 
MongoDB - Database \
NodeJS and Express - Backend Server \
ReactJS - FrontEnd 

WebApp is currently hosted locally only. Currently working on hosting it on MongoDB Realm

### About MongoDB 
- Stores data in BSON (Binary JSON) format. 
- Supports many data types 

|  Relational |   MongoDB  |
|:-----------:|:----------:|
| Database    | Database   |
| Table       | Collection |
| Row         | Document   |
| Index       | Index      |
| Join        | $lookup    |
| Foreign Key | Reference  |

## Directories 

### 1. Backend 
Application Programming Interace (API)
- Route Files: Creates the routes that people can go to 
- Controller Files: Handles the API Calls 

Data Access Objects (DAO)
- Queries the database
- Consists of the various getter methods for the restaurants 
- Handles adding, updating and deleting of reviews 

server.js 
- Configures an Express server 

index.js 
- Connects to the database and starts the server 

.env File
- Stores the environment variables 


### 2. Frontend 
The frontend of this web application takes reference to Bootstrap and takes most of the html/css code from bootstrap documentation 

Services 
- Makes the API calls 

Components 
- The various frontend components of the web app are created here 
- In the case of the restaurant reviewer, there is the 
    - add review --> Helps the user the add reviews to restaurants once they are logged in 
    - login --> Dummy log in system 
    - restaurants list --> Lists the restaurants based on filters 
    - restaurants components --> Single restaurant display 

