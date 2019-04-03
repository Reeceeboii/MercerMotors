/*
const http = require('http');
const middleware = require('./middlewareRouter');


// hardcoded port for dev purposes
// when the app is being hosted this would be different
const port = process.env.PORT || 80;

// bind middleware to http server as a request handler
const server = http.createServer(middleware);

server.listen(port, () => console.log(`Server up @localhost:${port}`));
*/

const middleware = require('./middlewareRouter');

const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;

//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(middleware);


// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

/*
//production mode
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  //
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'));
  })
}
//build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/public/index.html'));
})
*/
app.listen(port, () => console.log(`Listening on port ${port}`));
