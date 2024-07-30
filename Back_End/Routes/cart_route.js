const express = require("express")
const user = require("../Models/User")
const {authenticateToken} = require("./userAuth")

const cart_router = express.Router()

//add to cart
cart_router.put("/add-book", authenticateToken , async(req, res) => {
    try {
        const { bookid, id } = req.headers
        const userData = await user.findById(id)
        const bookinCart = userData.cart.includes(bookid)
        if(bookinCart){
            return res.status(200).json({
                success:true,
                message: "Book is already in cart"
            })
        }
        await user.findByIdAndUpdate(id,{$push:{ cart: bookid}})
        return res.status(200).json({
            success:true,
            message: "Book added to cart"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
)

// //remove from cart
cart_router.put("/remove-book/:bookid", authenticateToken , async(req, res) => {
    try {
        const { id } = req.params
        const { bookid } = req.headers
        await user.findByIdAndUpdate(id,{$pull:{ cart: bookid}})
       
            return res.status(200).json({
                status:"success",
                message: "Book removed from cart"
            })
    
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
)

//get a cart of particular user
cart_router.get("/get-user-cart", authenticateToken , async(req, res) => {
    try {
        const { id } = req.headers
        const userData = await user.findById(id).populate("cart")
        const cart = userData.cart.reverse()
        return res.status(200).json({
                status:"success",
                data: cart
            })
    
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
)


module.exports = cart_router