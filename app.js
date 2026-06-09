const express = require("express")
const cors = require("cors")
const setUpSwagger = require("./swagger/swagger")
const { sequelize } = require("./models")
require("dotenv").config()

const userController = require("./routes/userRoute")
const productController = require("./routes/productRoute")
const orderController = require("./routes/orderRoute")
const contactController = require("./routes/contactRoute")
const categoryController = require("./routes/categoryRoute")
const servicesController = require("./routes/servicesRout")


const app = express()

app.use(express.json())
app.use(cors({
    origin: "*",
}))

app.use("/root", userController)
app.use("/pro", productController)
app.use("/order", orderController)
app.use("/cont", contactController)
app.use("/cate", categoryController)
app.use("/server", servicesController)

setUpSwagger(app)

const PORT = process.env.PORT || 3000

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    })
}) 