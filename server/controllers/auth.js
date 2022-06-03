import router from '../routes/private.js';
import User from '../models/User.js';
import ErrorResponse from '../utils/errorResponse.js';
import crypto from 'crypto';
import mg from 'mailgun-js';
const mailgun = () => 
    mg({
            apiKey: process.env.API_KEY,
            domain: process.env.DOMAIN,
     });

export const register = async (req, res, next) => {
    const { name, firstName, username, email, password, role} = req.body;
    try {
        const user = await User.create({
            name,
            firstName,
            username,
            email,
            password,
            role
        });
        
       sendToken(user, 201, res);
        
    } catch (error) {
            next(error);
    }
};

export const login = async (req, res, next) => {
    const {  email, password } = req.body;
    
    if(!email || !password) {
        return next(new ErrorResponse("Please provide an email and password", 400));
    }

    try {
        const user = await User.findOne({ email }).select("+password");
        
        if(!user) {
            
        return next(new ErrorResponse("Invalid Credentials", 401));
        }
        const isMatch = await user.matchPasswords(password);

        if(!isMatch) {
            return next(new ErrorResponse("invalid Credentials", 401));
        }

       sendToken(user, 201,res);
       console.log(user);

    } catch (error) {
        res.status(500).json({success: false, error: error.message});
        
    }

};


export const forgotpassword = async (req, res, next) => {
    const {email} = req.body;

    try {
        const user = await User.findOne({email});

        if(!user){
            return next(new ErrorResponse("Email does not exist",404));
        }

        const resetToken = user.getResetPasswordToken();

        await user.save();

        const resetURL = `http://localhost:3000/passwordreset/${resetToken}`;
        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password</p>
            <a href=${resetURL} clicktracking=off>${resetURL}</a>
            `
                
                mailgun().messages().send({
                        
                    from: 'Helmi Bacha <planisware.psa.mis@gmail.com>',
                    to: user.email,
                    subject: 'Forgot Password',
                    html: message,
                },
                (error,body) => {
                    if(error) {

                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpire = undefined;
                        user.save();
                        return next(new ErrorResponse("Email could not be sent", 500))

                    }else{
                        console.log(body);
                        res.json({success: true ,data:"Email Sent"});
                    }
                }
                )

             
        
    } catch (error) {
        next(error);
    };


};


export const resetpassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: {$gt: Date.now()}
        })

        if(!user){
            return next(new ErrorResponse("Invalid Reset Token",400));
        }

        user.password = req.body.password;
        user.resetPasswordToken =undefined;
        user.resetPasswordExpire =undefined;

        await user.save();

        res.status(201).json({success: true,data: "Password reset successful"});
        
    } catch (error) {
        next(error);
    }
};


const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({success: true, token, user});
}

export default router;