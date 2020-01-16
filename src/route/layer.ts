import { IFCObject } from '../entity/IFCObject';
import { getConnection } from 'typeorm';


// Display list of all Authors.
export async function layer_get_all(req, res) {
    const connectionManager = getConnection().manager;
    const layers = await connectionManager.find(IFCObject, { select: ["calque"] }).catch(error => {
        res.status(500);
        res.json({Success: false, Error: error});
    });
    res.status(200);
    res.json(layers);
}

export async function ifcObject_get_all_with_layer(req, res) {
    const connectionManager = getConnection().manager;
    const ifcObjects = await connectionManager.find(IFCObject, {select: ["oid"],
                                                                        where: {calque: req.params.calque}})
        .catch(error => {
        res.status(500);
        res.json({Success: false, Error: error});
    });
    res.status(200);
    res.json(ifcObjects);
}


