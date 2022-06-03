import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, 'Please insert a name']
    },
    firstName: {
        type: String,
        required:[true, 'Please insert a firstname']
    },
    username: {
        type: String,
        required: [true, "Please enter a username"],
    },
    email: {
        type: String,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Email is invalid or already exists",
            ],
    },
    password: {
        type: String,
        required: [true, "please insert a password"],
        minlength: 6,
        select: false,
    },
    role: {
        type: String,
        required: [true , "please isnert a role"],
        default: "Consultant"
    },
    resetPasswordToken: String,
    resetTokenExpire: Date,
});

UserSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }

    const salt= await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPasswords = async function(password) {
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.getSignedToken = function() {
    return jwt.sign({ id:this._id, role: this.role }, process.env.JWT_PRIVATE, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

UserSchema.methods.getResetPasswordToken = function() {
    const resetToken =crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * (60 *1000); 
    return resetToken;
}

export default mongoose.models.User || mongoose.model('User', UserSchema);