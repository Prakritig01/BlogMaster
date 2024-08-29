const express = require('express')
const app = express();
const port = 3020;

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('welcome to Home Page');
});

app.get('/set-cookie', (req, res) => {
   
    const key = 'user2';
    const value = 'piki';
    res.cookie(key,value);
    res.send(`Cookie is set ${value}`);

});

app.get('/get-cookie', (req, res) => { 
    console.log(req.cookies.user);
    res.send('cookie is read');
});



