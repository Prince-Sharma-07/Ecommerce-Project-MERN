/*
Post localhost: 8888/ecomm/api/v1/auth/signup

i need to intercept this
*/
const authController = require("../controllers/auth.controller")
const authMw = require("../middlewares/auth.mw")
const authMW = require("../middlewares/auth.mw")

module.exports = (app)=>{
    app.post("/ecomm/api/v1/auth/signup" ,[authMW.verifySignUpBody], authController.signup)  //whenever someone tries to call post on this uri then signup method got called
    app.post("/ecomm/api/v1/auth/signin" , authController.signin)
}

