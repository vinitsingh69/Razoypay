const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/users") 
.then( () => console.log("connection sucessfull....."))
.catch((err) => console.log(err)); 