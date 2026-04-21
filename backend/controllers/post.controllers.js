const Post = require("../models/post.model");
const User = require("../models/user.model");

module.exports = {
    createPost: async (req, res) => {
        try {
            const { title, description } = req.body;
            const newPost = await Post.create({
                title,
                description
            })
            return res.status(201).json({
                status: true,
                message: "Post created successfully!",
                data: newPost
            })  
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: `Error while creating post: ${error.message}`
            })
        }
    },
    updatePost: async (req, res) => {
        try {
            const { postId } = req.params;
            const post = await Post.findById(postId);
            if(!post){
                return res.status(404).json({
                    status: false,
                    message: "Post not exist!"
                })  
            }
            const updatedPost = await Post.findByIdAndUpdate(postId, {
                ...req.body
            })
            return res.status(201).json({
                status: true,
                message: "Post updated successfully!",
                data: updatedPost
            })  
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: `Error while updating post: ${error.message}`
            })
        }
    },
    deletePost: async (req, res) => {
        try {
            const { postId } = req.params;
            const post = await Post.findById(postId);
            if(!post){
                return res.status(404).json({
                    status: false,
                    message: "Post not exist!"
                })  
            }
            await Post.findByIdAndDelete(postId)
            return res.status(201).json({
                status: true,
                message: "Post Deleted successfully!"
            })  
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: `Error while deleting post: ${error.message}`
            })
        }
    },
    getPosts: async (req, res) => {
        try {
            // const {} = req.query;
            // const userData = req.user;
            // const user = await User.findOne({ email: userData });
            // if(user.role !== "admin"){
            //     return res.status(403).json({
            //         status: false,
            //         message: "Access Denied!"
            //     })    
            // }
            const posts = await Post.find();
            return res.status(200).json({
                status: false,
                message: "Posts fetched successfully!",
                data: posts
            })  
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: `Error while fetching posts: ${error.message}`
            })
        }
    },
    getPostById: async (req, res) => {
        try {
            const { postId } = req.params;
            // const userData = req.user;
            // const user = await User.findOne({ email: userData });
            // if(user.role !== "admin"){
            //     return res.status(403).json({
            //         status: false,
            //         message: "Access Denied!"
            //     })    
            // }
            const post = await Post.findById(postId);
            if(!post){
                return res.status(404).json({
                    status: false,
                    message: "Post not found!"
                })
            }
            return res.status(200).json({
                status: false,
                message: "Post fetched successfully!",
                data: post
            })  
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: `Error while fetching posts: ${error.message}`
            })
        }
    }
}