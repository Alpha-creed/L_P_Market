const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const Notice = require("../models/noticeModel");

//add a notification
router.post("/notify",authMiddleware,async(req,res)=>{
    try {
        const newNotice = new Notice(req.body);
        await newNotice.save();
        res.send({
            success:true,
            message:"Notification added successfully",
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message,
        })
    }
})

//get all notification
router.get("/get-all-notice",authMiddleware,async(req,res)=>{
    try {
        const notice = await Notice.find({
            user:req.body.userId,
        }).sort({createdAt:-1});
        res.send({
            success:true,
            data:notice,
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message,
        })
    }
})

//delete a notification
router.delete("/delete-notice/:id",authMiddleware,async(req,res)=>{
    try {
        await Notice.findByIdAndDelete(req.params.id);
        res.send({
            success:true,
            message:"Notification deleted successfully",
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

//read all notification by user
router.put("/read-all-notice",authMiddleware,async(req,res)=>{
    try {
        await Notice.updateMany(
            {user:req.body.userId,read:false},
            {$set:{read:true}}
        )
        res.send({
            success:true,
            message:"All notifications marked as read",
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message,
        })
    }
})

module.exports = router