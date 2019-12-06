import "reflect-metadata";
import {Column, Connection, createConnection, PrimaryColumn} from "typeorm";
import {IFCObject} from "./entity/IFCObject";

let activeConnection: Connection;
createConnection().then(async connection => {
    activeConnection = connection;
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
app.get("/ifcObject/:oid", async (req, res, next) => {
    const oid = parseInt(req.params.oid);
    console.log(oid);
    const ifcObjectRepository = activeConnection.getRepository(IFCObject);
    const ifcObject = await ifcObjectRepository.findOne({oid: oid});
    console.log(ifcObject);
    res.json(ifcObject);
});

app.post("/ifcObject", async (req, res, next) => {
    console.log(req);
    let ifcObject = new IFCObject();
    ifcObject.oid = parseInt(req.query.oid);
    ifcObject.ifcId = req.query.ifcId;
    ifcObject.name = req.query.name;
    ifcObject.SectionNature = req.query.SectionNature;
    ifcObject.sectionAnnexePiece = req.query.sectionAnnexePiece;
    ifcObject.sectionAppartement = req.query.sectionAppartement;
    ifcObject.sectionBatiment = req.query.sectionBatiment;
    ifcObject.sectionEtage = req.query.sectionEtage;
    ifcObject.sectionPiece = req.query.sectionPiece;
    ifcObject.properties = req.query.properties;

    activeConnection.manager
        .save(ifcObject)
        .then(ifcObject => {
            console.log("ifcObject has been saved. ifcObject id is", ifcObject.oid);
            res.json({ Success : true });
        }).catch(error => {
            console.log(error);
            res.json({ Success : false });
    });

});
app.listen(3000, () => {
    console.log("Server running on port 3000");

});
