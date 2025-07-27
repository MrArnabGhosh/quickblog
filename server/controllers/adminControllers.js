import jwt from 'jsonwebtoken'
import Blog from '../models/BlogModels.js'
import Comment from '../models/Comment.js'
import User from '../models/UserModel.js'


export const adminLogin = async(req,res)=>{
   try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required." });
        }

        let user = await User.findOne({ email });

        if (!user) {
            
            user = new User({ email, password });
            await user.save();
            
            user = await User.findOne({ email }); 

        } else {
            // If user exists, check password
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({ success: false, message: "Invalid Credentials." });
            }
        }


        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7h' });

        res.json({ success: true, message: "Login successful!", token, user: { id: user._id, email: user.email } });

    } catch (error) {
        console.error("Login/Registration Error:", error);
        res.status(500).json({ success: false, message: "Server error during login/registration.", error: error.message });
    }
}

export const getAllBlogsAdmin = async(req,res)=>{
    try {
        const blogs = await Blog.find({}).sort({createdAt: -1}) 
        res.json({success:true,blogs})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

export const getAllComments = async(req,res)=>{
    try {
        const comments = await Comment.find({}).populate("blog").sort({createdAt:-1})
        res.json({success:true,comments}) 
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

export const getDashboardData = async(req,res)=>{
    try {
        const recentBlogs = await Blog.find({}).sort({createdAt:-1}).limit(5)
        const blogs = await Blog.countDocuments()
        const comments = await Comment.countDocuments()
        const drafts = await Blog.countDocuments({isPublished:false})

        const dashBoardData = {
            recentBlogs,blogs,comments,drafts
        }
        res.json({success:true,dashBoardData})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

export const deleteCommentsById = async(req,res)=>{
    try {
        const {id} = req.body
        await Comment.findByIdAndDelete(id)
        res.json({success:true,message:"Comment deleted successfully"})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

export const approvedCommentsById = async(req,res)=>{
    try {
        const {id} = req.body
        await Comment.findByIdAndUpdate(id , {isApproved:true})
        res.json({success:true,message:"Comment Approved successfully"})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}