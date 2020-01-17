import { IFCObject } from '../entity/IFCObject';
import { getConnection } from 'typeorm';


// Display list of all Authors.
export async function ifcObject_get_all(req, res) {
  const connectionManager = getConnection().manager;
  const ifcObjects = await connectionManager.find(IFCObject).catch(error => {
    res.status(500);
    res.json({Success: false, Error: error});
  });
  res.status(200);
  res.json(ifcObjects);
}

export async function ifcObject_get_all_layers(req, res) {
  const connectionManager = getConnection().manager;
  const ifcObjects = await connectionManager.find(IFCObject, { select: ["calque"] }).catch(error => {
    res.status(500);
    res.json({Success: false, Error: error});
  });
  res.status(200);
  res.json(ifcObjects);
}

export async function ifcObject_get_all_with_layer(req, res) {
  const connectionManager = getConnection().manager;
  const ifcObjects = await connectionManager.find(IFCObject, {calque: req.params.calque}).catch(error => {
    res.status(500);
    res.json({Success: false, Error: error});
  });
  res.status(200);
  res.json(ifcObjects);
}

export async function ifcObject_get_one(req, res) {
  const connectionManager = getConnection().manager;
  const userRepository = connectionManager.getRepository(IFCObject);
  const ifcObject = await userRepository.findOneOrFail({oid: parseInt(req.params.oid, 10)}).catch(error => {
    res.status(500);
    res.json({Success: false, Error: error});
  });
  console.log('ifcObject_get_one : ', ifcObject);
  res.status(200);
  res.json(ifcObject);
}


export async function ifcObject_add(req, res) {
  try {
    const connectionManager = getConnection().manager;
    const ifcObjectRepository = connectionManager.getRepository(IFCObject);
    console.log("ifcObject_add", req.params.oid);
    console.log(req.body.calque);
    
    const ifcObject = new IFCObject(
      parseInt(req.params.oid, 10),
      req.body.ifcId,
      req.body.name,
      req.body.SectionNature,
      req.body.sectionAnnexePiece,
      req.body.sectionAppartement,
      req.body.sectionBatiment,
      req.body.sectionEtage,
      req.body.sectionPiece,
      req.body.calque,
      req.body.properties);

    const createdIfcObject = await ifcObjectRepository.save(ifcObject);
    res.json(createdIfcObject);

  } catch (e) {
      console.log(e);
    res.json(e);
  }
}

export async function ifcObject_update(req, res) {
  try {
    const connectionManager = getConnection().manager;
    const ifcObjectRepository = connectionManager.getRepository(IFCObject);
    console.log('ifcObject_update : ', req.params);
    console.log('ifcObject_update : ', req.body);

    const ifcObject = new IFCObject(
      parseInt(req.params.oid, 10),
      req.body.ifcId,
      req.body.name,
      req.body.SectionNature,
      req.body.sectionAnnexePiece,
      req.body.sectionAppartement,
      req.body.sectionBatiment,
      req.body.sectionEtage,
      req.body.sectionPiece,
      req.body.calque,
      req.body.properties);
    console.log(req.body.properties)
    await ifcObjectRepository.save(ifcObject);
    const result = await ifcObjectRepository.findOne(ifcObject.oid);
    res.json(result);
  } catch (e) {
      console.log(e);
    res.json({error: e});
  }
}


// delete
export async function ifcObject_delete(req, res) {
  try {
    const connectionManager = getConnection().manager;
    const ifcObjectRepository = connectionManager.getRepository(IFCObject);
    const result = await ifcObjectRepository.delete(parseInt(req.params.oid, 10));
    res.json(result);
  } catch (e) {
    res.json(e);
  }
}

