const jwt = require('jsonwebtoken');

const secretKey = "224deaa95117e8f78344ea3083f34917672447f6136eae9e940ee7ef70fc8a469828aad8080e8ab064158107b0dadf3c4fd81173cb1ce784224e3a17e2d74892";

module.exports = function (req,res,next){
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.usr = decoded.id;
        next();
    } 
    catch (err) {
        console.error('Token verification error:', err.message);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
