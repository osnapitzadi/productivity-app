# Productivity app with Create React, React-Bootstrap and Firebase

Try the demo at https://productivity-app-prod.web.app/ 


## Stack

- Create React App
- React Router
- React Router Redux
- Firebase SDK with OAuth authentication


Quick Start
-----------

```shell
$ git clone https://github.com/osnapitzadi/productivity-app.git
$ cd productivity-app
$ npm install
$ npm start
```

## Deploying to Firebase
#### Prerequisites:
- Create a free Firebase account at https://firebase.google.com
- Create a project from your [Firebase account console](https://console.firebase.google.com)
- Configure the authentication providers for your Firebase project from your Firebase account console

#### Configure this app with your project-specific details:
```json
// .firebaserc

{
  "projects": {
    "default": "your-project-id"
  }
}
```

Rename .env-example to .env.local 
Then change content to 
```env
// src/firebase/config.js
REACT_APP_FIREBASE_API_KEY=your api key
REACT_APP_AUTH_DOMAIN=your-project-id.firebaseapp.com
REACT_APP_DATABASE_URL=https://your-project-id.firebaseio.com
REACT_APP_PROJECT_ID=your project id
REACT_APP_STORAGE_BUCKET=your storage bucket
REACT_APP_MESSAGING_SENDER_ID=your messaging sender id
REACT_APP_APP_ID=your app id
```
You can find this information in Firebase console

#### Install firebase-tools:
```shell
$ npm install -g firebase-tools
```

#### Build and deploy the app:
```shell
$ npm run build
$ firebase login
$ firebase use default
$ firebase deploy
```


## NPM Commands

|Script|Description|
|---|---|
|`npm start`|Start webpack development server @ `localhost:3000`|
|`npm run build`|Build the application to `./build` directory|
|`npm test`|Test the application; watch for changes and retest|
