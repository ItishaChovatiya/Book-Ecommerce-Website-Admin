const express = require("express")
const user_router = require("./user_routes")
const book_router = require("./book_routes")
const fav_router = require("./favourites")
const cart_router = require("./cart_route")
const order_router = require("./order_routes")



const router = express()

router.use("/link",user_router)
router.use("/book",book_router)
router.use("/fav",fav_router)
router.use("/cart",cart_router)
router.use("/order",order_router)

module.exports = router