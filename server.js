const express = require('express');
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const cors = require('cors');
const app = express();

app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const jwtSecret = 'secret123';
const users = [
    {
        username: 'john',
        password: 'password123admin',
        role: 'admin'
    }, {
        username: 'anna',
        password: 'password123member',
        role: 'member'
    }
];
// Find user login info
app.use('/login', (req, res) => {
  const { username, password } = req.body;
    console.log(username);
    // filter user from the users array by username and password
    const user = users.find(u => { return u.username === username && u.password === password });

   if (user) {
    
        res.send({
            statusCode: 200,
            token: jsonwebtoken.sign({ user: user.username }, jwtSecret),
            message: "User is successfully logged in"
          });
        // res.json({
        //     accessToken,
        //     refreshToken
        // });
    } else {
        res.send({
          statusCode: 403,
          message: "Username or password incorrect"
        });
    }
});

app.use(jwt({ secret: jwtSecret, algorithms: ['HS256'] }));


app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));
