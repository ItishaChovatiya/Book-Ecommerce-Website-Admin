// const express = require("express")
// const connectDB = require("./Connection/Connection")
// const cors = require("cors")
// const user = require("./Routes/index")

// const app = express()
// require("dotenv").config()

// app.listen(process.env.PORT,()=>{
//     console.log(`Server is running on port ${process.env.PORT}`)
// })
// app.use(cors())
// app.use(express.json())
// app.use("/v1",user)
// connectDB()

const express = require("express")
const connectDB = require("./Connection/Connection")
const cors = require("cors")
const user = require("./Routes/index")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())
app.use("/v1", user)

connectDB()

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
