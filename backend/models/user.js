const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// validate the password with passed on user password
userSchema.methods.isValidatedPassword = async function (userSentPassword) {
    return await bcrypt.compare(userSentPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);