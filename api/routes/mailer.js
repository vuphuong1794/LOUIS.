const router = require("express").Router();
const sendMail = require("../sendMail")
router.post("/sendMail", async(req, res)=>{
    const { username, email, subject, telephone, message } = req.body;
    try{
        await sendMail(username, email, subject, telephone, message);
        res.status(200).json("email has send");
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;