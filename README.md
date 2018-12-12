# comicBOOM

_Life in Four Panels: Become the Hero of Your Own Story_

`comicBOOM` lets you tell your story the best way possible: in four panels. Take a video with this Web App to share life -- in comic book form. Animated gifs capture moments from uploaded videos for users to share. Developed using React, Redux, Express, Nodejs, Python, and deployed on Heroku with Firebase for storage, ComicBOOM enables users to upload videos to the server where Python creates a four-panel animated gif.

Originally developed for Fullstack Academy Grace Hopper Program Capstone Project by Hystee Weldon, Jinyan Shen, Lauren E Kirincich, and Samantha Francis

### Tech Stack

Front End:
React, Redux

Back End:
Express/Node, Sequelize/PostgreSQL, Python with moviePy, Firebase Storage

### To Start

The server needs to run in Nodejs and have Python installed. The Python path in `server/api/upload.js` will need to be updated, and be sure the Python requirements in `requirements.txt` are installed.

touch secrets.js (in root directory of the project) && attach the following secret env variables:

process.env.FIREBASE_APIKEY = 'ACCESS_KEY_ID_HERE'
process.env.FIREBASE_AUTHDOMAIN = 'AUTH_DOMAIN_HERE'
process.env.FIREBASE_DATABASEURL = 'STORAGE_URL_HERE'
process.env.STORAGE_BUCKET = 'STORAGE_BUCKET_HERE'

`javascript`
`npm install`
`npm start`

### Testing

`javascript`
`npm run test`
