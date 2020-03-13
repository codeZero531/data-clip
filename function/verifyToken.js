var express = require('express');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        console.log('header not found');
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null'){
        console.log('header null');
        return res.status(401).send('Unauthorized request');
    }

    try{
        let payload = jwt.verify( token, 'janaka') ;
        req.userId = payload.subject;
        next();
    } catch (e) {
        console.log('not verify');
        return res.status(401).send('Unauthorized request');

    }


}

module.exports = verifyToken;
