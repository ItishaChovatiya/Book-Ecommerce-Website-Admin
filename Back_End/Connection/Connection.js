const mongoose = require('mongoose')

const connectDB = () =>{
    mongoose.connect("mongodb+srv://itishachovatiya7096:YET2WiD2z7qJY0JK@cluster.ff4a0gz.mongodb.net/bookStore").then((data)=>{
        if(data){
            console.log("Database connected successfully")
        }
    }).catch((err)=>{
        console.log(err)
    })
}


module.exports = connectDB