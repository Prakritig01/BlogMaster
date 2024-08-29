const jwt = require('jsonwebtoken');

// 1. create a secret 
const SECRET = "aVeryComplexSecret";

//2.create a payload
const payload = {
    'id' : 1234567890,
    'email' : 'prakritigupta1112002@gmail.com'
};



//3.create a token
const token = jwt.sign(payload,SECRET);    //token generation
console.log(`Token : ${token}` );




//4.verify the token
jwt.verify(token,SECRET,(err,decoded)=>{
    if(err){
        console.log(err.message);
    }else{

        console.log(`Decoded Successfully : ${decoded}`);     //backtick mei nai aaaeyga values  //decoded is a object
        console.log(decoded);
        //iat is option object and willl tell us the validity of the token
        //full form of iat is issued at
    }
});
// hw: create a token with expiry of 5 minutes 

