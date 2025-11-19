
const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv =  require("dotenv");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

mongoose.connect("mongodb+srv://Ameen:waleola@cluster0.vldtdsq.mongodb.net/?appName=Cluster0")
.then(() => {
    console.log("DB connected successfully")
})
.catch(err => {
    console.log("Error connecting to DB: ", err.message);
})

dotenv.config();

server.use("/", express.static("./assets"));

server.use(cors({
    origin: "http://localhost:3000"
}))

server.use(fileUpload({
    limits: {fileSize: 50 * 1024 * 1024}
}));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

const productRouter = require("./routes/product.route");
const adminRouter = require("./routes/admin.route");

server.use("/", productRouter);
server.use("/", adminRouter);

const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
    console.log("Server is now running on port ", PORT)
})