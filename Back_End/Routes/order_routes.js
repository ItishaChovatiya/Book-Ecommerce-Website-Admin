const express = require("express")
const user = require("../Models/User")
const Book = require("../Models/Book")
const order = require("../Models/Order")
const {authenticateToken} = require("./userAuth")

const order_router = express.Router()

//place order
order_router.post("/placeOrder", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers
        const { order } = req.body
        for (const orderData of order){
            const newOrder = new order({user: id, book :orderData._id})
            const orderDatafromDB = await newOrder.save()
            //saving order in user model
            await user.findByIdAndUpdate(id, {
                $push:{cart:orderDatafromDB._id}
            })
            //clearing cart
            await user.findByIdAndUpdate(id, {
                $pull:{cart:orderData._id}
            })
        }
        return res.status(200).json({
            status:"success",
            message:"order placed successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
)


//get order if particular user
order_router.get("/getOrder", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers
        const userData = await user.findById(id).populate({
            path: "orders",
            populate:{ path:"book"}
        })
        const ordersData = userData.orders.reverse()
        return res.status(200).json({
            status:"success",
            data:ordersData
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
)

//get all orders admin
order_router.get("/get-all-orders", authenticateToken, async (req, res) => {
    try {
        const userData = await order.find().populate({path:"book"}).populate({path:"user"}).sort({createdAt: -1})
        return res.status(200).json({
            status:"success",
            data:userData
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
)

//update order admin
order_router.put("/update-status/:id", authenticateToken, async(req,res)=>{
    try {
        const { id } = req.params
        await order.findByIdAndUpdate(id, {status: req.body.status}) 
        return res.status(200).json({
            status:"success",
            message:"status update successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
)
module.exports = order_router