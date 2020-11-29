# Livid_App
Movie Rental App- Backend

This project is the backend of Livid, an imaginary video rental app. I've used many RESTful api's for various endpoints to register and authenticate users. 
Genres api is created for classifying the movies according to their genres. The rental date, fee and movie information is handled using different endpoints.

Setup
Make sure to follow all these steps exactly as explained below. Do not miss any steps or you won't be able to run this application.

Install MongoDB
To run this project, you need to install the latest version of MongoDB Community Edition first.

https://docs.mongodb.com/manual/installation/

Once you install MongoDB, make sure it's running.

Install the Dependencies
Next, from the project folder, install the dependencies:

npm i

Run the Tests
You're almost done! Run the tests to make sure everything is working:

npm test

All tests should pass.

Start the Server

node index.js

This will launch the Node server on port 3000. If that port is busy, you can set a different port.
Open up your browser and head over to:

http://localhost:3000/api/genres

You should see the list of genres. That confirms that you have set up everything successfully.
