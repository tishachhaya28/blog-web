const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

module.exports = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const user = await User.findOne({email});
            if(user){
                return res.status(400).json({
                    status: false,
                    message: "User already exist with provided email!"
                })    
            }
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(password, salt);
            const newUser = await User.create({
                name,
                email,
                password: hashPass
            })
            return res.status(201).json({
                status: true,
                message: "User registered successfully!",
                data: newUser
            })  
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: `Error while registration: ${error.message}`
            })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({email});
            if(!user){
                return res.status(400).json({
                    status: false,
                    message: "User not found with provided email!"
                })    
            }
            if(!user?.isActive){
                return res.status(400).json({
                    status: false,
                    message: "Account deactivated, contact admin!"
                })   
            }
            const isPassMatch = await bcrypt.compare(password, user.password);
            if(!isPassMatch){
                return res.status(400).json({
                    status: false,
                    message: "Incorrect Password!"
                })  
            }
            const token = await jwt.sign({ 
                email: user.email, 
                role: user.role 
            }, process.env.JWT_SECRET);
            return res.status(200).json({
                status: true,
                message: "User login successfully!",
                data: {
                    user,
                    token
                }
            })  
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: `Error while login: ${error.message}`
            })
        }
    },
    userActiveDeactive: async (req, res) => {
        try {
            const { userId } = req.params;
            const userData = await User.findById(userId);
            const updatedUser = await User.findByIdAndUpdate(userId, {
                isActive: !userData?.isActive
            })
            return res.status(200).json({
                status: true,
                message: "User updated successfully!",
                data: updatedUser
            })  
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: `Error while user updation: ${error.message}`
            })
        }
    },
    getUsers: async (req, res) => {
        try {
            const users = await User.find();
            return res.status(200).json({
                status: true,
                message: "Users fetched successfully!",
                data: users
            })  
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: `Error while fetching users: ${error.message}`
            })
        }
    },
}