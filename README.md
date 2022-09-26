# URL Shortener Microservice

Completed as part of freeCodeCamp's Backend and API certification.

## Things I have learnt

- Setup and use Mongoose for MongoDB (non-relational database)
- Use Javascript's built-in URL constructor to check if URL is valid
- Use Node's dns module to look up domains and check if they are valid
- Use res.redirect to send user to new URL

## Installation

To install this repository on your local machine, fork or clone the repository from GitHub. To do this, you can run:

```javascript
git clone https://github.com/SchoolOfCode/final-project_back-end-12.git
```

Or to fork, you can press the 'fork' button on this page, and follow the on-screen instructions.

Once you have access to this repository on your local machine, change directory into the right folder:

```javascript
cd url-shortener
```

Once you are inside this directory, run:

```javascript
npm i
```

This will install all the necessary dependencies.

We are using ES6 import and export syntax.

## Setting Up Your Environment

After you have installed the project on your local machine, you will want to set up the necessary environment variables to connect the project to your Mongo database.

To do this, create a `.env` file at the root level of the folder. Save the following database credentials inside of the `.env` file:

```javascript
MONGO_URI=<your DB_URI>
```

## Scripts and Commands

To run the back-end on localhost, run:

```javascript
npm start
```

Or to use nodemon to automatically restart on file change:

```javascript
npm run dev
```

To clear all documents from the database, run:

```javascript
npm run reset
```

## Using the microservice

To use the basic user interface, run the start script and visit `http://localhost:3000` which will serve the html file from the views folder. Fill in the input box with the URL you want to shorten and click the `POST URL` button, which will make a http request to /api/shorturl with the URL from the input box.

You can also simulate this behaviour by making a POST request directly to `http://localhost:3000/api/shorturl` using Postman or similar.

The server will parse the URL to ensure it is in a valid format - the URL must include the protocol (e.g. `https://`). The dns.lookup only checks the domain is valid, it will not check any path or queries are valid.

The server will respond with a short_url, which will be a number. If you visit `http://localhost:3000/api/shorturl/<number>` where <number> is the response you received from the server, you will automatically be directed to the associated URL that is linked to that number.
