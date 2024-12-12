const { Otp } = require('../model/otpmodel');//import kiye hai
const { User } = require('../model/User');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {HttpStatusCode} = require('axios');////this line
exports.SendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if(!email){
           return res.status(HttpStatusCode.Unauthorized).json({
                success:false,
                message:"provide an email"
            })
        }
        const Isfoundemail = await Otp.findOne({ email });

        if (Isfoundemail) {
            return res.status(HttpStatusCode.Unauthorized).json({
                success: false,
                message: "OTP already sent to the email"
            });
        }

        const generateOtp = () => {
            const RandomOtp = crypto.randomInt(10000, 100000); // 6-digit OTP
            return RandomOtp;
        }
        let uniqueOtp = false;
        let emailOtp;

        while (!uniqueOtp) {
            emailOtp = generateOtp();
            const findOtp = await Otp.findOne({ otp: emailOtp });
            if (!findOtp) {
                uniqueOtp = true;
            }
        }

        const newOtp = new Otp({
            email,
            otp: emailOtp
        });

        await newOtp.save();

        return res.status(HttpStatusCode.Ok).json({
            success: true,
            message: `OTP sent on ${email}`
        });

    } catch (error) {
        console.error("Error during OTP generation:", error);
        return res.status(HttpStatusCode.InternalServerError).json({
            success: false,
            message: "Internal server error"
        });
    }
}
//..................verify otp...............................///
exports.verifyOtp = async (req, res) => {
    try {
        const { otp } = req.body; 

        if (otp === undefined || otp === null) {
            return res.status(HttpStatusCode.BadRequest).json({ // Use BadRequest for missing OTP
                success: false,
                message: "OTP not provided. Please provide a valid OTP."
            });
        }
       

        const otpNumber = Number(otp);

        const recentOtp = await Otp.findOne({ otp: otpNumber }).sort({ createdAt: -1 }).limit(1);
        
        if (!recentOtp) {
            return res.status(HttpStatusCode.NotFound).json({
                success: false,
                message: "OTP not found for the provided email."
            });
        }
        
     
        const recentOtpNumber = Number(recentOtp.otp);


        if (otpNumber !== recentOtpNumber) {
            return res.status(HttpStatusCode.BadRequest).json({
                success: false,
                message: "Invalid OTP. Please provide a valid OTP."
            });
        }

      
        return res.status(HttpStatusCode.Ok).json({
            success: true,
            message: "OTP verified successfully."
        });

    } catch (error) {
        
        console.error('Error verifying OTP:', error);
        return res.status(HttpStatusCode.InternalServerError).json({
            success: false,
            message: "An error occurred while verifying the OTP. Please try again."
        });
    }
};


//.................Signup.........................................//



exports.Signup = async (req, res) => {
    try {
        const { firstname, lastname, email, password, confirmpassword ,gender,role } = req.body;
        
        
        if (!firstname || !lastname || !email || !password || !confirmpassword||!gender||!role) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the data"
            });
        }

        if (password !== confirmpassword) {
            return res.status(HttpStatusCode.BadRequest).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        const FindUser = await User.findOne({ email });
        if (FindUser) {
            return res.status(401).json({
                success: false,
                message: "User already registered"
            });
        }

       
        const verifiedOtp = await Otp.findOne({ email });
        if (!verifiedOtp) {
            return res.status(HttpStatusCode.Unauthorized).json({
                success: false,
                message: "Email not verified. Please verify the email through OTP first."
            });
        }

        const payload = new User({
            firstname: firstname,
            lastname: lastname,
            email,
            password: confirmpassword,
            gender,
            role
        });

        const NewUser = await payload.save();
        if (NewUser) {
            return res.status(HttpStatusCode.Ok).json({
                success: true,
                payload: NewUser,
              message: "Successfully Signup"
            });
        }

    } catch (error) {
        console.error("Error handling request:", error.message);
        return res.status(HttpStatusCode.InternalServerError).json({
            success: false,
            message: "User cannot be registered, please try again."
        });
    }
};
//.......................lOGIN..................................//
exports.Login = async (req,res)=>{
try {
    const {email,password} = req.body;
if(!email || !password){
    return res.status(HttpStatusCode.BadRequest).json({
        success:false,
        message:"email and password both are required"
    });
}
const FindUser = await User.findOne({email});
if(!FindUser){
    return res.status(HttpStatusCode.Unauthorized).json({
        success:false,
        message:"user does not exits.please Signup"
    })
}
const IsfoundPassword =  await bcrypt.compare(password,FindUser.password);
if(!IsfoundPassword){
    return res.status(HttpStatusCode.Unauthorized).json({
        success:false,
        message:"please enter valid password"
    })
}
// Generating a token
const payload ={
    email: FindUser.email,
    _id:FindUser._id,
    Role:FindUser.role
}
const token = jwt.sign(payload,process.env.JWT_SECRET,{
    expiresIn:'5m'
})
// This is cookies option
const option = {
   expires: new Date(Date.now() + 300000), // 5 minutes
    httpOnly:true,///cookies fronted pe access nhi ho sakta hai.
    sameSite:"Strict"
}
res.cookie('token',token,option);
FindUser.password=undefined
return res.status(HttpStatusCode.Ok).json({
    success: true,
    findUser: FindUser,
    token,
    message: "Successfully logged in"
});
} catch (error) {
        console.error("Error handling request:", error);
        return res.status(HttpStatusCode.InternalServerError).json({
            success: false,
            message: "user can not registered please try again."
        });

}
}
//....................................LOGOUT...................................//
exports.Logout = (req, res) => {
    try {
        // Clear the 'token' cookie by setting its value to an empty string and expire it immediately
        res.cookie('token', '', {
            expires: new Date(0),   // Set the expiration date to the past to effectively delete the cookie
            httpOnly: true,
            secure: true,
            sameSite: "Strict"
        });

        return res.status(200).json({
            success: true,
            message: "Successfully logged out"
        });

    } catch (error) {
        console.error("Error during logout:", error);

        return res.status(500).json({
            success: false,
            message: "Error while logging out, please try again"
        });
    }
};