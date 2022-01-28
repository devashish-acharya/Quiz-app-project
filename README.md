# Project Breakdown" 

## Description

This project is a web application that is made for students and tutors/creators to create collabarative quizes. Users are able to create accounts and login, create personal quizes and take tests. 

This is the first initilization of this project. Due to time constrains and struggles faced, Users are currently only able to create and access their own quiz. I am hoping in future i can take this app further where different users can view all quizes in a community page, and also be able to interact with eachother.

This app is created by using MERN stack and a variety of different libraries. A full list of this can be found in the package.json file in both "server" and "client" directories.


## User model
During the planning stage of this project, I came up with a scope of things i will try to complete.

I planned the users, scores and quiz to be created mongoose schema and each of these models.
Then i came up with all the information these model was to be filled with. There is also an extra step of validation in the data of these schema.

This can be found in the root->server->models directory.

## Testing

Unfortunately, due to time struggle to get a working app out, i was unable to do any testing in this project. However in future updates, I will be using cypress and percy to create a thorough automated testing enviornment for the front end(after the project is at a completed state).

I will also use jest to test the backend.

## Components

I organised all the components and pages into specific directories to make routing and pathing between pages and databases much easier. All components can be found in the directory root->client->src->components.

Each of these component has a JavaScript file and a CSS file. In the Javascript files for these components i perform axios calls, set up variables and functions to run certain functionalities of the the component and finally use the react render to render html in the front end. 

This is then styled using CSS, which i plan on improving a lot in the future as currently it has not been optimised to be mobile responsive.

These compontents are then routed in the App.js file in the src directory.

The http requests for these routes are then performed in the directory root->server->routes.