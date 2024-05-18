const router = require("express").Router();
const sendMail = require("../sendMail")
router.post("/sendMail", async(req, res)=>{
    try{
        const { username, email, subject, telephone, message } = req.body;
        await sendMail(username, email, subject, telephone, message);
        res.status(200).json({ message: 'Email sent successfully' });
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Failed to send email' });
    }
})

module.exports = router;