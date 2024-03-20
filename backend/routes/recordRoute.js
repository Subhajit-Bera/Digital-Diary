const express=require("express");
const router = express.Router();
const {isLogin} =require("../middleware/auth");
const {createRecord,getAllRecords,deleteRecord,searchRecordsByDate,getRecordById}=require("../controllers/recordController");

router.post("/create",isLogin,createRecord);
router.get("/",isLogin,getAllRecords);
router.get("/search",isLogin,searchRecordsByDate);
router.get("/:id",isLogin,getRecordById);
router.delete("/:recordId",isLogin,deleteRecord);
module.exports = router;