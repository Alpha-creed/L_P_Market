const express = require("express")
const app = express();
const port = process.env.PORT||5000;
const {db} = require("./db/config")
const bodyParser = require("body-parser")
const cors = require("cors");
require("dotenv").config();

const userRoute = require("./routes/userRoutes")
const productRoute = require("./routes/ProductRoutes")
const noticeRoute = require("./routes/noticeRoute")
const bidRoute = require("./models/bidModel")

//middleware
app.use(cors(corsOption))
var corsOption = {
    origin:"http://localhost:3000"
}
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use("/api/user",userRoute)
app.use("/api/product",productRoute)
app.use("/api/notice",noticeRoute)
app.use("/api/bids",bidRoute)

const server = ()=>{
    db()
    app.listen(port,()=>{
        console.log(`Node js server started on port ${port}`);
    })
    app.on("error",console.error.bind(console,"MongoDB connection error"))
}

server()