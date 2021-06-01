const express = require("express");
const route = require("./Routes");

const app = express();

const PORT = 5000;

//Use body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));//to handle url encoded data

app.use('/items',route);

app.listen(PORT,(req,res)=>{
    console.log(`server listening at port ${PORT}`)
})