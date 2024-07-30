const express = require("express")
const user_router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const user = require("../Models/User")
const {authenticateToken} = require("./userAuth")

//sign up
user_router.post("/signup", async(req, res) => {
    try {

        const {username,email,password,address} = req.body

        //check username length is more than 4
        if(username.length < 4){
          return res.status(400).json({
                message:"username must be more than 4 characters"
            })
        }

         //check username already exist?
         const existinguser_name = await user.findOne({username:username})
         if(existinguser_name){
           return res.status(400).json({
                message:"username already exist"
            })
        }

         //check email alrredy exist?
         const existingemail = await user.findOne({email:email})
         if(existingemail){
           return res.status(400).json({
                message:"email already exist"
            })
        }

         //check password length?
         if(password.length <= 5){
            return res.status(400).json({
                  message:"password should be more than 4 characters"
              })
          }

          const pass_bcrypt = await bcrypt.hash(password,10)


          const newUser = new user ({
            username:username,
            email:email,
            password:pass_bcrypt,
            address:address
          })
          await newUser.save()
          return res.status(200).json({
            message:"signup successfully"
          })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
)

//sign In
user_router.post("/sign-in", async(req, res) => {
    try {
        const { username,password} = req.body
        
        const existing_username = await user.findOne({username})
        if(!existing_username){
            return res.status(400).json({
                message:"username does not exist"
        })
    }
    await bcrypt.compare(password,existing_username.password, (err,data)=>{

        if(data){
            const authclaims = [
                { name:existing_username.username},
                {role:existing_username.role}
            ]
    
            const token = jwt.sign({authclaims},"bookstore123",{
                expiresIn:"30d"
            })

            return res.status(200).json({id:existing_username._id, role:existing_username.role, token:token})
        }else{
            return res.status(400).json({message:"password is incorrect"})
        }
    })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
)

//get-user information
user_router.get("/get-user-info",authenticateToken,async(req,res)=>{
    try {
        const {id} = req.headers
        const data = await user.findById(id).select('-password')
        return res.status(200).json(data)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
)

//update address
user_router.put("/update-address", authenticateToken , async(req,res) =>{
    try {
        const {id} = req.headers
        const {address} = req.body
        await user.findByIdAndUpdate(id,{address:address})
        return res.status(200).json({message:"adderss updated succesfully"})

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
)
module.exports = user_router