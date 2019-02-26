const http = require('http');
const middleware = require('./middlewareRouter');

// hardcoded port for dev purposes; this would be an injected environment variable
// when the app is being hosted
const port = process.env.PORT || 5000;

// bind middleware to http server as a request handler
const server = http.createServer(middleware);

server.listen(port, () => console.log(`Server up @localhost:${port}`));