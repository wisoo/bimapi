let ifcObject_express = require('express');

let ifcObjectRouter = ifcObject_express.Router();

// Require controller modules.
let ifcObjectController = require('../route/ifcObject');

/// ifcObject ROUTES ///

ifcObjectRouter.get('/', ifcObjectController.ifcObject_get_all);
ifcObjectRouter.get('/:oid', ifcObjectController.ifcObject_get_one);
ifcObjectRouter.post('/:oid', function(req, res) {
  ifcObjectController.ifcObject_add(req, res);
});
ifcObjectRouter.put('/:oid', function(req, res) {
  ifcObjectController.ifcObject_update(req, res);
});
ifcObjectRouter.delete('/:oid', function(req, res) {
  ifcObjectController.ifcObject_delete(req, res);
});

module.exports = ifcObjectRouter;
