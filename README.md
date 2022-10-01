# Suspense-Twitter

⚡ This project is a lightweight Twitter clone that loads the last 5 Tweets from a specified user's timeline. It features a functional search bar that finds users by their Twitter handle.

## Technology

[Twitter-API-v2](https://developer.twitter.com/en/docs/twitter-api) as the Twitter client for fetching data, React as the front-end library for creating UI components, and Express as the back-end framework to handle requests and building APIs.

## Installation

This project uses [npm](https://www.npmjs.com/) as its package manager.

### Getting Environment Variables for Twitter-API-v2
Acquiring a bearer token for authenticating with Twitter's API is mandatory for this project to work. Navigate [here](https://developer.twitter.com/en/docs/twitter-api/getting-started/about-twitter-api) and click on "Sign up" underneath the Essential access level.

After signing up, create a new project in the developer portal and generate a new bearer token. This will be used to authenticate access to Twitter's API.

Change directory into the project's server folder and create a `.env` file
```bash
cd server
touch .env
```

Add the bearer token to your `.env` file.
```env
BEARER_TOKEN = "YOUR_BEARER_TOKEN_HERE"
```


### Server
Change directory into the project's server folder
```bash
cd server
```

Install dependencies. [nodemon](https://www.npmjs.com/package/nodemon) is used to manage and monitor changes made to the server's source.
```bash
npm i
```

Start the development server
```bash
nodemon
```

### Client
Start another terminal instance from the project's root and change directory into the client folder
```bash
cd client/suspense-twitter-client
```

Install dependencies. [Vite](https://vitejs.dev/) is used as a toolchain to create a blazing fast development environment. React will be our front-end library of choice to build UI compnents
```bash
npm i
```

Start the development server
```bash
vite
```

Navigate to the application in your web browser
```
http://localhost:3000/
```

## Building for production
To deploy this application to a host, start by creating a build for the client.

```bash
cd client
vite build
```

Copy all files created from this build and place it into a `server/public` folder. 

In `server.js` note that Express is serving these minified front-end files.
```js
// using static directory
app.use(express.static(path.join(__dirname + "/public")));
```

A production fork of this project has been created and deployed on Heroku. 

Find the live instance of the application [HERE](https://suspense-twitter-build.herokuapp.com/)

Find the production build [HERE](https://github.com/theericzhang/suspense-twitter-build)