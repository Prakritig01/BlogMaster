const User = require("../models/user");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const signup_post = (req, res) => {
  // 1. Extract the name, email and password from the request body
  // const { name, email, password } = req.body;
  const obj = req.body;
  console.log("my object is this : ", obj);

  // 2. Create a new user in the database

  const newUser = new User(obj);
  console.log(`new user is ${newUser}`);

  newUser
    .save()
    .then((user) => {
      console.log("user created successfully");
      const token = getToken(user.email,user.name);
      // console.log('token is: inside save ', token);
      res.cookie('authToken',token);
      // 2a. If user is created successfully, create a token,
      // // send it back as cookie, and redirect to all blogs page /blogs

      res.redirect("/blogs"); //redirect to blogs page
    })
    .catch((err) => {
      console.log("this is error section");
      console.log(err);
      // 2b. If user creation fails, send an error message with status code 400 (Bad Request)
      res.status(400).send(`Error creating user: ${err}`);
    });
};

function getToken(email,name){
  const secret = 'veryComplexSecret';
  const token = jwt.sign({ email,name}, secret);      //object to be passed in the token
  // console.log('token is inside getToken function:', token);
  return token;
}



const login_post = (req, res) => {
  // 1. Extract the email and password from the request body
  // const obj = req.body;
  const { email, password } = req.body;
  // console.log(req.body);
  // 2. Search for the user in the database
  // 2a. If user is found and password is correct, create a token,
  // // send it back as cookie, and redirect to all blogs page /blogs
  // 2b. If user is not found or password is incorrect, send an error message with status code 400 (Bad Request)
  //   res.send("Login route POST");
  User.findOne({ email: email })
    .then((user) => {
      // console.log(user);
      if (user.password !== password) {
        return res.status(400).send("Incorrect password");
        // res.redirect("/login");
      } else {
        console.log("inside login password matched");

        // res.send('Login successful');
        const token = getToken(user.email,user.name);
        res.cookie('authToken',token);
        res.redirect("/blogs");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
      res.send("Error logging in");
    });
};


const logout_delete = (req, res) => {
  console.log("logout route");
  res.clearCookie("authToken");
  res.redirect("/auth/login");
};

module.exports = { signup_post, login_post ,logout_delete};
