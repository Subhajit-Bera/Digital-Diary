const express=require("express");
const router = express.Router();
const {register,login} =require("../controllers/userController");

router.post("/login",login)
router.post("/register",register)

module.exports = router;