# Drug_Prescription_Reminder--BE
A desktop app that allows users play youtube tracks/videos in the BG

## Link to deployed App

**[Production Deployment Backend](https://lambda-youtube-music.herokuapp.com/)**



## Installation

## Backend

- Clone the repo by clicking the green clone or download button to copy the url on github
- In your teminal, run `git clone [insert URL copied from first step]`
- Open the repository with your code editor
  `master` is the default branch and contains all full the code`
- Setup `.env => checkout sample (.env.example) in the codebase` for environment variable
- Quick note if using MongoDb Atlas you have to `Whitelist IP address` on `Network access` tab `click add ip address` and `add current ip address` or `allow access from anywhere` tab for mongoDb to give access to the app and connect to the db
- Here's an example of `MONGO_URL` on Atlas i used for easy app set up
- `mongodb+srv://<username>:<password>@cluster-585-ex-ex.mongodb.net/test?retryWrites=true&w=majority`
- Run `npm install` to install all dependencies
- Type `npm run server` to get the development server running


## Required features

- Users can **create an account**
- Users can **login**

## Technologies

- Nodejs
- ExpressJS
-MongoDB



### API BASE LINK

[https://lambda-youtube-music.herokuapp.com](https://lambda-youtube-music.herokuapp.com)


## API-ENDPOINTS

`- POST /api/v1/users/register Create a new user.`

`- POST /api/v1/users/login Login a user.`







