import "reflect-metadata";
import {Column, Connection, createConnection, PrimaryColumn} from "typeorm";
import {error} from "util";
let cors = require('cors');

let activeConnection: Connection;
const ifcObjectController = require('./controller/ifcObjectController');


createConnection().catch(error => console.log(error));
const express = require("express");
const app = express();

app.use(express.json());
app.use(cors());
/*app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*'); //http://localhost:3000,
    res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT,PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','*');
    res.setHeader('Access-Control-Allow-Credentials','true');
    next();
});*/
app.use('/ifcObject', ifcObjectController);
app.listen(3000, () => {
    console.log("Server running on port 3000");

});
