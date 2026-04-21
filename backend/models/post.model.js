const { Schema, default: mongoose } = require("mongoose");

const postSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true,
        unique: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true
})

const Post = mongoose.model("posts", postSchema);
module.exports = Post;