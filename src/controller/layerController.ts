let calque_express = require('express');

let calqueRouter = calque_express.Router();

// Require controller modules.
let layerController = require('../route/layer');

/// layer ROUTES ///

calqueRouter.get('/', layerController.layer_get_all);
calqueRouter.get('/:calque', function (req, res) {
    layerController.ifcObject_get_all_with_layer(req, res);
});

module.exports = calqueRouter;
