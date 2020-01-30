import { IFCObject } from '../entity/IFCObject';
import { getConnection } from 'typeorm';


// Display list of all Authors.
export async function layer_get_all(req, res) {

    const layers = await getConnection()
        .createQueryBuilder(IFCObject, 't1')
        .select('DISTINCT t1.calque')
        .where('calque is not null')
        .getRawMany();
    res.status(200);
    res.json(layers);
}

export async function layer_get_map(req, res) {
    const connectionManager = getConnection().manager;
    const layers = await getConnection()
        .createQueryBuilder(IFCObject, 't1')
        .select('DISTINCT t1.calque')
        .where('calque is not null')
        .getRawMany();
    let temp: Array<Number> = [];
    let tempOids: Array<Number> = [];
    const layersMap: Map<String, Array<Number>> = new Map<String, Array<Number>>();

    for (let layer of layers){
        layersMap.set(layer.calque, []);
    }
    for (let layer of layersMap.keys()){
        tempOids = [];
        temp = layersMap.get(layer);

        const ifcObjects = await connectionManager.find(IFCObject, {select: ["oid"],
            where: {calque: layer}})
            .catch(error => {
                console.log(error);
                res.status(500);
                res.json({Success: false, Error: error});
            });
        if (ifcObjects){
            for (let ifcObject of ifcObjects){
                tempOids.push(ifcObject.oid);
            }
        }
        layersMap.set(layer, tempOids);
    }
    let jsonResult: Array<{calque : String, oids : Array<Number>}> = [];
    for (let [k,v] of layersMap) {
        jsonResult.push({calque: k , oids: v});
    }
    res.status(200);
    res.json(jsonResult);
}

export async function ifcObject_get_all_with_layer(req, res) {
    console.log('getAllWithLayer');
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


