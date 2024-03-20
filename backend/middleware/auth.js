const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const isLogin = asyncHandler(async (req, res, next) => {
    let token;

    //Get token from headers
    token = req?.headers?.authorization?.split(" ")[1];

    //decodes token id
    const decodedUser = jwt.verify(token, process.env.JWT_KEY);

    //We are findig the user and return it without the password: .select("-password");
    //   req.user = await User.findById(decoded.id).select("-password");

    if (!decodedUser) {
        throw new Error("Invalid/Expired token, please login again");
    } else {
        //If verifyToken return the user
        //save the user into req obj
        //We are adding userAuthId (custom) field to the req object and assign the decodedUser id to **
        req.authId = decodedUser?.id;
        next();
    }

});

module.exports = { isLogin };