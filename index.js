const express = require("express");
const alias = require('./routes/routes');
const app = express();

app.use(express.json());

app.use("",alias);

app.listen(3000,()=>{
    console.log("server started");
});
