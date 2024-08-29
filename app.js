const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogpostRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/auth/authRoutes');
const faker = require('faker');
const BlogPost = require('./models/blogpost');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


// CONSTANTS
const USER_NAME = 'prakriti_01';
const PASSWORD = 'prakriti1112';
const DB_NAME = 'BlogPostDB';
const DB_URI = `mongodb+srv://prakriti_01:${PASSWORD}@merncluster.khab0.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=mernCluster`;
const PORT = 3020;

// express app
const app = express();
// middleware & static files
app.use(express.static('public'));
// app.use(morgan('dev'));
app.use(express.json());

mongoose.connect(DB_URI)
    .then((result) => {
        console.log('Connected to database');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to database', err);
        process.exit(1); // Exit the process with a failure code
    });


// register view engine
app.set('view engine', 'ejs');

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

app.use(cookieParser());

function checkUser(req, res, next) {
    const token = req.cookies.authToken;
    // console.log('token is:', token);
    // console.log(token);
    if (token) {
        jwt.verify(token, 'veryComplexSecret', (err, decodedToken) => {
            if (err) {
                // console.log(`Token is incorrect: ${err}`);
                res.locals.user = null;
            } else {
                // Token is correct
                res.locals.user = decodedToken; // {email: "email"}
                // console.log('check user function in app.js:', res.locals.user);
            }
            // next();
        });
    } else {
        res.locals.user = null;
    }
    next();
}

app.use(checkUser);


app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// auth routes
app.use('/auth', authRoutes);

// blog routes
app.use('/blogs', blogpostRoutes);

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});


// 404 page
app.use((req, res) => {
    res.status(404).render('error', { title: 'Error' });
});


// 1. Let's submit a form
// Q: What is the default method of the form?
// -> GET
// Q: What is the default path of the form?
// -> /blogs
// Q: What is the content type of the form? 
// -> application/x-www-form-urlencoded
// Q: What is url encoding?
// -> It is a way to encode the form data before sending it to the server.
// Do we need to convert this url encoded data to JSON?
// -> Yes
// How to do that?
// -> Use body-parser middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// What is the difference between body-parser.urlencoded and body-parser.json?
// -> urlencoded is used to parse the data with content type application/x-www-form-urlencoded
// -> json is used to parse the data with content type application/json
