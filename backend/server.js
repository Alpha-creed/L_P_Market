const express = require("express")
const app = express();
const port = process.env.PORT||5000;
const {db} = require("./db/config")
const bodyParser = require("body-parser")
const cors = require("cors");
require("dotenv").config();

const userRoute = require("./routes/userRoutes")
const productRoute = require("./routes/ProductRoutes")


app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use("/api/user",userRoute)
app.use("/api/product",productRoute)

const server = ()=>{
    db()
    app.listen(port,()=>{
        console.log(`Node js server started on port ${port}`);
    })
    app.on("error",console.error.bind(console,"MongoDB connection error"))
}

server()