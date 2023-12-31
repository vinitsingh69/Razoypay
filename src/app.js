const express = require("express");
const path = require("path");
const { connection } = require("mongoose");
const razorpay = require("razorpay");
const app = express();
const hbs = require("hbs");
const Student = require("./models/register");
const port = process.env.PORT || 5500;
require("./db/connection");
 
const csspath = path.join(__dirname, "../public"); 
app.use(express.static(csspath));
app.use(express.json()) 
app.use(express.urlencoded({extended:false})) 
const myviewpath = path.join(__dirname, "../templates/views");
const mypartialpath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", myviewpath);
hbs.registerPartials(mypartialpath);
  
app.get("",  (req, res) => {
    res.render("index");
})
app.get("/login",  (req, res) => {
    res.render("login");
}) 
app.get("/singup",  (req, res) => {
    res.render("singup");
}) 
app.post("/singup", async (req, res) => {
    try{
       const password = req.body.password;
      const cnfrmpassword = req.body.cnfrmpassword;
      if(cnfrmpassword == password){
        const myregister = new Student({
            Myname : req.body.Myname,
            email : req.body.email,
            password : req.body.password,
            cnfrmpassword : req.body.cnfrmpassword
        })  
        const mydata = await myregister.save();
        res.status(201).render("index");
      }
      else{
        res.status(400).send("Password Not Match");
      }
    } catch(error){
        res.status(400).send(error);
    }
})
app.post("/login", async (req, res) => {
    try{
        
       const email = req.body.email;
       const password = req.body.password;
       const data = await Student.findOne({email : email})
       if(data.password === password){
        res.status(201).render("index");
       }
       else{
        res.send("password not match");
       }
    } catch(error){
        res.status(400).send(error);
    }
})

app.post("/payment", async (req, res) => {

    let {amount}  = req.body;
    var instance = new razorpay({ key_id: 'rzp_test_RLh2orj8xSBN9g', key_secret: 'bmIFT0wG4AueDFAT160V8VxV' })

    let order = await  instance.orders.create({
        amount: amount*100,
        currency: "INR",
        receipt: "receipt#1",
    }) 

    res.status(201).json({
        success : true, 
        order,
        amount  
    })
})
    
app.listen(port, () =>{
    console.log(`${port}`);
})

