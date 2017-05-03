# SHOUT INTO THE VOID - A SOCIAL MICROBLOG

## Synopsis

This is a social microblog contructed with the MEAN stack - MongoDB, Express, Angular, and Node. Like many social platforms, it exists to allow users to gaze into an abyss which also gazes back at them. Shout into the void and listen for echoes.

## Motivation

This project is a vehicle for my experimentation with JSON Web Tokens, and perhaps a guide for anyone looking to get their feet wet with authentication.

## API STRUCTURE

/posts          GET     - retrieve all posts in decending date order
/posts          POST    - insert a new post into db

/posts/:postId  GET     - retrieve one post
/posts/:postId  POST    - add comment to one post
/posts/:postId  PUT     - edit one post
/posts/:postId  DELETE  - delete one post

/newuser        POST    - register a new user
/loginuser      POST    - authenticate existing user

## Installation

Installation of this app requires node, npm, and mongoDB. After cloning, please run:

`npm install`

and then:

`npm start`
