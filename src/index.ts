import "reflect-metadata";
import {createConnection} from "typeorm";
import {IFCObject} from "./entity/IFCObject";

createConnection().then(async connection => {

    console.log('Inserting a new ifcObject into the database...');
    const ifcObject = new IFCObject();
    ifcObject.ifcId = '123456';
    ifcObject.name = 'test';
    ifcObject.oid = 123456;
    ifcObject.properties = '{}' ;
    ifcObject.sectionAnnexePiece = 'a';
    ifcObject.sectionAppartement = '0';
    ifcObject.sectionBatiment = 'a';
    ifcObject.sectionEtage = '1';
    ifcObject.SectionNature = '1';
    ifcObject.sectionPiece = '1';
    await connection.manager.save(ifcObject);
    console.log("Saved a new user with id: " + ifcObject.oid);

    console.log("Loading users from the database...");
    const ifcObjects = await connection.manager.find(IFCObject);
    console.log("Loaded users: ", ifcObjects);


}).catch(error => console.log(error));
const express = require("express");
const app = express();
app.get("/ifcObject/:oid", (req, res, next) => {
    const oid = parseInt(req.params.id, 10);
    console.log(oid);
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});
app.listen(3000, () => {
    console.log("Server running on port 3000");

});
