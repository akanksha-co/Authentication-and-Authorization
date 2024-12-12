const express = require('express');
const router = express.Router();
const { SendOtp, Signup, Login, verifyOtp,Logout } = require('../controller/Auth');
const { Decode, isInstructor,isStudents} = require('../middleware/Decode');

router.get('/test', Decode, (req, res) => {
    console.log("jj");
    
    res.json({
        success: true,
        message: 'welcome to protected Routes'
    });
});

router.get('/admin', Decode, isInstructor, (req, res) => {
    res.json({
        success: true,
        message: "welcome to Admin protected Route"
    });
});
router.get('/student', Decode, isStudents, (req, res) => {
    res.json({
        success: true,
        message: "welcome to Student protected Route"
    });
})

router.post('/signup', Signup);
router.post('/sendotp', SendOtp);
router.post('/verifyotp', verifyOtp);
router.post('/login', Login);
router.get('/decode',Decode);
router.post('/logout',Logout);


module.exports = router;
