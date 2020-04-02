function apiVerifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({status: 401, message: 'Unauthorized request'});
    }
    let apiToken = req.headers.authorization.split(' ')[1];
    console.log(req.headers.authorization);
    if (apiToken === 'null'){
        return res.status(401).json({status: 401, message: 'Unauthorized request'});
    }
    try{
        req.apiToken = apiToken;
        next();
    } catch (e) {
        console.log('not verify');
        return res.status(401).json({status: 401, message: 'Unauthorized request'});
    }
}
module.exports = apiVerifyToken;
