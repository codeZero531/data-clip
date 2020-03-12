var express = require('express');
var router = express.Router();
const request = require('request');

/* GET home page. */
router.get('/:id', function(req, res, next) {
    const id = req.params.id;
    res.send(id);
});

router.get('/', function(req, res, next) {
    const id = req.params.id;
    const name = req.params.name;
    res.send(id + ' ' + name);
});

module.exports = router;
