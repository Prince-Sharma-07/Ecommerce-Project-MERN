//By this file project will start

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const server_config = require('./configs/server.config')
const db_config = require("./configs/db.config")
const user_model = require('./models/user.model')
const bcrypt = require("bcryptjs")

app.use(express.json())

//connection with with MongoDB
mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on("error" , ()=>{
    console.log("Error while connecting to the mongoDB")
})

db.once("open" , ()=>{
    console.log("Connected to MongoDB")
    init()
})

/*
 Create an admin user at the starting of the application
 if not already present
*/



async function init(){
    try{
        let user = await user_model.findOne({userId : "admin"})
        if(user){
            console.log("Admin is already present")
            return
        }
    }
    catch(err){
        console.log("Error while reading the data" , err)
    }
    
    try{
        user = await user_model.create({
            name : "Prince",
            userId : "admin",
            email : "connect.princesharma@gmail.com",
            userType : "ADMIN",
            password : bcrypt.hashSync("vasvi",8)
        })
        console.log("Admin created" , user)
    }catch(err){
        console.log('Error while create admin' , err)
    }
}

/*
stitch the route to the server
*/
require('./routes/auth.routes')(app) //calling routes and passing app object
//start the server 

app.listen(server_config.PORT , ()=>{     //ye port number config me isiliye dala kuki baad me port number change krna hoga to ek jagah pr change krenge vo sabhu jagah reflect hoga
    console.log(`Server Started at port number : ${server_config.PORT}`)
})


