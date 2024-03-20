const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");

const register = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error("User already Exist")
    }

    const user = await User.create({
        username,
        email,
        password
    });

    if (user) {
        res.status(201).json({
            message: "User Registered Successfully",
            data: user,
        });
    } else {
        res.status(400);
        throw new Error("Internal Server Error");
    }
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);

    }

    const user = await User.findOne({ email });
    if (user && (await user?.isValidatedPassword(password))) {
        res.status(201).json({
            user,
            token: generateToken(user._id)
        });
    
    }else{
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
})



module.exports = { register,login };