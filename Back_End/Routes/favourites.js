const express = require("express")
const user = require("../Models/User")
const {authenticateToken} = require("./userAuth")

const fav_router = express.Router()

//add favourite book
fav_router.put("/getFav",authenticateToken,async(req,res) => {
    try {
        const { bookid,id } = req.headers
        const userData = await user.findById(id)
        const isBookFavourites = userData.favorites.includes(bookid)
        if(isBookFavourites){
            return res.status(200).json({ message:"book is alrready favourites"})
        }
        await user.findByIdAndUpdate(id, {$push:{favorites:bookid }})
        return res.status(200).json({ message:"book added to favourites"})
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
)

//delete favourite book
fav_router.put("/delete-Fav-book",authenticateToken,async(req,res) => {
    try {
        const { bookid,id } = req.headers
        const userData = await user.findById(id)
        const isBookFavourites = userData.favorites.includes(bookid)
        if(isBookFavourites){
            await user.findByIdAndUpdate(id, {$pull:{favorites:bookid }})
        }
      
        return res.status(200).json({ message:"book remove from favourites"})
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
)


//get favourites book from particular user
fav_router.get("/get-Fav-book",authenticateToken,async(req,res) => {
    try {
        const { id } = req.headers
        const userData = await user.findById(id).populate("favorites")
        const isBookFavourites = userData.favorites
        return res.status(200).json({
            success: true,
            data: isBookFavourites
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
)



module.exports = fav_router