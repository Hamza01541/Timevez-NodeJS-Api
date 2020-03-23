const jwt = require("jsonwebtoken"); // import JWT token

/** 
 * this middleware checks if the user is logged in.
 * And attaches the user name and user id to the header of every request.
 */
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, 'technovez-privateKey');

        req.userData = { username: decodedToken.username, userId: decodedToken.userId };
        next();
    } catch (error) {
        return res.status(401).json({ message: "You are not logged in!" });
    }
}
