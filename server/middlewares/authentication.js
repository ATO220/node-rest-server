const jwt = require('jsonwebtoken');

//=================================================
//   Token Verification
//=================================================

let verifyToken = (req, res, next) => {
    let token = req.get('Authorization');

    jwt.verify(token, process.env.SEED,(err, decoded) =>{
        if(err){
            res.status(401).json({
                ok: false,
                err
            });
        }

        req.user = decoded.user;
        next();
    });
}

//=================================================
//   Admin Role Verification
//=================================================

let verifyAdminRole = (req, res, next) => {
    let user = req.user;

    if( user.role === 'ADMIN_ROLE' ){
        next();
    } else {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'User is not administrator'
            }
        })
    }
};

module.exports = {
    verifyToken,
    verifyAdminRole
};