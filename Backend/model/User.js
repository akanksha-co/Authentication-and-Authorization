const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');
const RoleEnum = require("../Enum/Enum");
const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    gender:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:Object.values(RoleEnum),
        required:true
    }
}, { timestamps: true });

// Hash the password before saving the user
//pre middleware
const saltRound = 10;
UserSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, saltRound);
    }
    next();
});
const User = mongoose.model('User',UserSchema);
module.exports={
    User
} 