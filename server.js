const http = require('http');
const middleware = require('./middlewareRouter');

require('dotenv').config();


// hardcoded port for dev purposes
// when the app is being hosted this would be different
const port = process.env.PORT || 5000;

// bind middleware to http server as a request handler
const server = http.createServer(middleware);

server.listen(port, () => console.log(`Server up @localhost:${port}`));