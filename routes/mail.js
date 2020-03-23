var express = require('express');
var router = express.Router();
const mailSend = require('../function/mailSend');

router.get('/hello', async (req, res, next) => {
    mailSend("janakapradeepedirisinghe@gmail.com", "dfdfdsfsdfdsf").then(
        result => res.send(result)
    ).catch(console.error);
});

module.exports = router;
