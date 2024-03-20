const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const Record = require("../models/record");

const createRecord = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    // console.log(req.authId);
    if (!title || !content) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }
    const record = await Record.create({ title, content, user: req.authId });
    if (record) {
        res.status(201).json(record);
    } else {
        res.status(500);
        throw new ErrorEvent("Internal Server Error")
    }

})


const getAllRecords = asyncHandler(async (req, res) => {

    const userId = req?.authId; // Assuming you're passing user ID in the URL

    const records = await Record.find({ user: userId });
    if (!records) { // Check if records array is empty
        res.status(404); // Not Found
        throw new Error("No records found");
    }
    res.status(200).json(records);

});

// const searchRecordsByTitle = asyncHandler(async (req, res) => {
//     const records = await Record.find({ title: { $regex: req?.query?.title, $options: 'i' } });
//     if (!records) {
//         res.status(200).json({
//             "message": "No result found"
//         });
//     }
//     res.status(200).json(records);
// });



const searchRecordsByDate = asyncHandler(async (req, res) => {
    const { date } = req.query;
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    const records = await Record.find({
        user: req?.authId,
        date: { $gte: startDate, $lte: endDate }
    });
    res.json(records);
});

const getRecordById = async (req, res) => {
    const { id } = req.params;

    try {
        const record = await Record.findById({_id:id});
        if (!record) {
            res.status(404).json({ message: 'Record not found' });
            return;
        }
        res.status(200).json(record);
    } catch (error) {
        console.error('Error fetching record:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



const deleteRecord = asyncHandler(async (req, res) => {
    const recordId = req.params.recordId; // Assuming you're passing record ID in the URL
    const record = await Record.findById(recordId);
    if (!record) {
        res.status(404).json({ error: 'Record not found' });
        return;
    }
    await Record.findByIdAndDelete(recordId);
    res.status(200).json({ message: 'Record deleted successfully' });
});
module.exports = { createRecord, getAllRecords, deleteRecord, searchRecordsByDate,getRecordById };