const mongoose = require("mongoose")

const user_Schema = mongoose.Schema(
    {
        username :{
            type : String,
            trim : true
        },
        email :{
            type : String,
            trim : true
        },
        password :{
            type : String,
            trim : true
        },
        address:{
            type : String,
            trim : true
        },
        user_avtar:{
            type : String,
            default : "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
            },
            role :{
                type : String,
                default : "user",
                enum : ["user","admin"]
                },
            favorites : [{
                    type : mongoose.Types.ObjectId,
                    ref : "books"     
                }],
                cart : [{
                    type : mongoose.Types.ObjectId,
                    ref : "books"     
                }],
                orders : [{
                    type : mongoose.Types.ObjectId,
                    ref : "order"     
                }]
    },
    {
        timestamps : true
    })

    module.exports = mongoose.model("user",user_Schema)