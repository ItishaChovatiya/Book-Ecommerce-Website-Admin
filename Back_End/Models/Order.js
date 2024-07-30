const mongoose = require("mongoose")

const order_Schema = mongoose.Schema(
    {
        user:{
            type : mongoose.Types.ObjectId,
            ref : "user"   
        },
        book:{
            type : mongoose.Types.ObjectId,
            ref : "books"   
        },
        status:{
            type : String,
            default: "Order placed",
            enum : ["Order placed","Out for delivery, Delivered, canceled"]
        }
    },
    {
        timestamps : true
    })

    module.exports = mongoose.model("order",order_Schema)