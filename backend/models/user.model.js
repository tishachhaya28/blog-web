const { Schema, default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    name: {
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
        required: true,
        min: 8
    },
    role: {
        type: String,
        required: true,
        default: "user"
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true
})

// userSchema.pre("save", async function(next) {
//     let user = this;
//     if(!user.isModified("password")){
//         return next();
//     }
//     try {
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(this.password, salt);
//         return next()
//     } catch (error) {
//         return next(error)
//     }
// })

const User = mongoose.model("users", userSchema);
module.exports = User;