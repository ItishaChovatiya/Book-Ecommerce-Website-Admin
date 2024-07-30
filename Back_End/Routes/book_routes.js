const express = require("express")
const book_router = express.Router()
const jwt = require("jsonwebtoken")
const Book = require("../Models/Book")
const user = require("../Models/User")
const {authenticateToken} = require("./userAuth")

//add book - admin
book_router.post("/add-book", authenticateToken, async(req,res)=>{
    try {
        const {id} = req.headers
       const User = await user.findById(id)
       if(User.role !== "admin"){
            return res.status(400).json({message:"you do not access admin pannel"})
       }
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            language: req.body.language
        })
        await book.save()
        res.status(200).json({message: "Book added successfully"})
    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
)

//update book
book_router.put("/update-book", authenticateToken, async(req,res)=>{
    try {
        const {bookid} = req.headers
        await Book.findByIdAndUpdate(bookid,{
            url:req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            language: req.body.language
        })
       return res.status(200).json({message: "Book updated successfully"})
    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
)

//delete book
book_router.delete("/delete-book", authenticateToken, async(req,res)=>{
    try {
        const {bookid} = req.headers
        await Book.findByIdAndDelete(bookid,{
            url:req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            language: req.body.language
        })
       return res.status(200).json({message: "Book deleted successfully"})
    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
)

//get all books
book_router.get("/get-all-books", async(req,res)=>{
    try {
      const books = await Book.find().sort({createdAt: -1})  
      return res.status(200).json({
        success: true,
        data:books
      })
    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
)

// get recenty added books limit 4
// book_router.get("/get-recent-books", async(req,res)=>{
//     try {
//       const books = await Book.find().sort({createdAt: -1}).limit(4)  
//       return res.status(200).json({
//         success: true,
//         data:books
//       })
//     }catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }
// )

book_router.get("/get-recent-books", async(req,res)=>{
        try {
          const books = await Book.find().sort({createdAt: -1}).limit(4)  
          return res.status(200).json({
            success: true,
            data:books
          })
        }catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
    )

//get book by ID
book_router.get("/get-book-by-id/:id", async(req,res)=>{
    try {
        
        const {id} = req.params
        const book = await Book.findById(id)
        return res.status(200).json({
            success: true,
            data:book
          })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
)
module.exports = book_router