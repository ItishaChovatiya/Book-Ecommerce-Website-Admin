const mongoose = require("mongoose")

const book_schema = mongoose.Schema(
    {
        url:{
            type: String,
            trim: true
        },
        title:{
            type: String,
            trim: true
        },
        author:{
            type: String,
            trim: true
        },
        price:{
            type: Number,
            trim: true
        },
        description:{
            type: String,
            trim: true
        },
        language:{
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    })

    module.exports = mongoose.model("books",book_schema)