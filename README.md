# SHOUT INTO THE VOID - A SOCIAL MICROBLOG

## API STRUCTURE
/posts          GET     - retrieve all posts in decending date order
/posts          POST    - insert a new post into db

/posts/:postId  GET     - retrieve one post
/posts/:postId  POST    - add comment to one post
/posts/:postId  PUT     - edit one post
/posts/:postId  DELETE  - delete one post

/newuser        POST    - register a new user
/loginuser      POST    - authenticate existing user