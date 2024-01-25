const express = require("express")
const app = express()
const cors = require('cors')  
const cookieParser = require('cookie-parser');
require("dotenv").config()
require("./config/mongoose.config")
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());                                         
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT

const Routes = require("./routes/developer.routes")
Routes(app)


app.listen(port, () => {
    console.log(`>>>>> Server is running on Port ${port} 🎈🎈🎈`)
})