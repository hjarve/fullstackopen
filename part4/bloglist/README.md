# Blog List
Backend of a blog list application. Logged in users can add blogs. A blog can be deleted only by the user who added it.

# About the project
This project was build with Node

## dependencies
express:  library that aims to provide a better abstraction for general use cases we usually require to build a backend server

cors: allow requests from other origins by using Node's cors middleware

mongoose: library that offers a higher-level API. Mongoose could be described as an object document mapper (ODM), and saving JavaScript objects as Mongo documents is straightforward with this library.

dotenv library

lodash library: JS library to work with arrays 

express-async-errors: the library allows to eliminate the try-catch blocks.

bcrypt: package for generating password hashes.

mongoose-unique-validator: library for validations

jsonwebtoken:  library that allows to generate JSON web tokens.


## dev dependencies: 
nodemon: nodemon will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart the node application.
jest: unit testing
cross-env: makes mode specification of the app to work on Windows (cross-platform compatibility)
supertest: package that helps to write tests for testing the API