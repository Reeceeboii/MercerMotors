This website cannot be ran locally without installing lots of packages as it is written in Node and React.
I am hosting my site live - you can view it at https://www.aczg110.co.uk/
The server was a bit wobbly at the time of submission but I'm hoping it holds up. If this domain doesn't connect, please email me
so I can provide an alternative. reece.mercer@city.ac.uk

Evidence of HTML - for a pure .html file, see ./client/public/index.html
                 - the rest of the .js files are React, and contain a mix of HTML and JS (JSX), see ./client/src/pages/

CSS - For plain CSS see ./client/App.css, and for a CSS file with media queries see ./client/src/styles/user.css

Validation  - validation of user input is handled by the frontend car sale form, and can be seen in ./client/src/pages/list.js

Client side JS - All React files (essentially any .js files deeper than and including ./client)

Database writes - new cars written to database - ./api/routes/cars.js
                - new sales written to database - ./api/routes/sales.js

Database reads - existing cars read from database - ./api/routes/cars.js
               - existing sales read from database - ./api/routes/sales.js

Security - user authentication and protected routes can be seen at ./client/src/App.js
         - escaping user input strings can be seen at ./api/routes/cars.js
