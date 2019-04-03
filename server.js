const middleware = require('./middlewareRouter');

const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000; 

//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));

// binding my middleware to handle api routes
app.use(middleware);


// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})


app.listen(port, () => console.log("Server started"));
