const { Router } = require("express");            //router is a function in express which helps to create routes
const bodyParser = require("body-parser");         //parse the data from the form
const UserController = require('../../controllers/UserController');

const router = Router();

router.get("/login", (req, res) => {
  res.render("auth/login", { title: "Login" });
});

router.get("/signup", (req, res) => {
  res.render("auth/signup", { title: "Sign Up" });
});

router.get("/logout",(req,res) =>{
  console.log('inside logout');
  user=null;
  res.clearCookie('authToken');
  res.redirect('/auth/login');
});

// Middleware to parse form data
router.use(bodyParser.urlencoded({ extended: true })); //why urlencodes? //to parse the data with content type application/x-www-form-urlencoded //nested objects ko bhi parse kareyga

// Signup route POST
router.post('/signup',UserController.signup_post);



// Login route POST
router.post('/login',UserController.login_post);


router.delete('/logout',UserController.logout_delete);


module.exports = router;















// // Middleware to parse form data
// router.use(bodyParser.urlencoded({ extended: true }));
// router.post('/signup', (req, res) => {
//     // 1. Extract the name, email and password from the request body
//     const { name, email, password } = req.body;
//     console.log(req.body);
//     // 2. Create a new user in the database
//     // 2a. If user is created successfully, create a token,
//     // // send it back as cookie, and redirect to all blogs page /blogs
//     // 2b. If user creation fails, send an error message with status code 400 (Bad Request)

//     User.create({ name, email, password })
//         .then(user => {
//             const token = create_token(user.id);
//             console.log(token);

//             // Add the token as a cookie
//             res.cookie('jwt', token);
//             // HW: options object of cookie

//             console.log('User created successfully');
//             res.redirect('/blogs');
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(400).send(`Error creating user: ${err}`);
//             // HW: Send a better error message
//         });

// });

// function create_token(user_id) {
//     const secret = 'veryComplexSecret';
//     return jwt.sign({ user_id }, secret);
//     // HW: options object
// }

// router.post('/login', (req, res) => {
//     // 1. Extract the email and password from the request body
//     const { email, password } = req.body;
//     console.log(req.body);
//     // 2. Search for the user in the database
//     // 2a. If user is found and password is correct, create a token,
//     // // send it back as cookie, and redirect to all blogs page /blogs
//     // 2b. If user is not found or password is incorrect, send an error message with status code 400 (Bad Request)
//     User.findOne({ email })
//         .then(user => {
//             if (!user) {
//                 return res.status(400).send('User not found');
//             }
//             else if (user.password !== password) {
//                 return res.status(400).send('Incorrect password');
//             }
//             else {
//                 const token = create_token(user.id);
//                 console.log(token);
//                 res.cookie('jwt', token);
//                 res.redirect('/');
//             }
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(400).send('Error logging in');
//         });
// });
