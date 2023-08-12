const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
    Myname: {
        type : String,
        require : true,
        minlegth : 3,
    },
    email: {
        type : String,
        require : true,
        unique : [true, "Email ID is already Registered"],
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email ID");
            }
        }
    },
    password: {
        type : String,
        require : true,
    },
    cnfrmpassword: {
        type : String,
        require : true,
    }
  });



  const Student = mongoose.model("Student", studentSchema);
  module.exports = Student;
