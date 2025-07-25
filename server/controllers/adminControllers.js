import jwt from 'jsonwebtoken'
import Blog from '../models/BlogModels.js'
import Comment from '../models/Comment.js'


export const adminLogin = async(req,res)=>{
    try {
        const {email,password}= req.body

        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD )
            return res.json({success:false , message:"Invalid Crediential"})
        
        const token = jwt.sign({email},process.env.JWT_SECRET)
        res.json({seccess:true, token})
    } catch (error) {
        res.json({seccess:false, message:error.message})
    }
}

export const getAllBlogsAdmin = async(req,res)=>{
    try {
        const blogs = await Blog.find({}).sort({createdAt: -1}) 
        res.json({success:true,blogs})
    } catch (error) {
        res.json({seccess:false, message:error.message})
    }
}

export const getAllComments = async(req,res)=>{
    try {
        const comments = await Comment.find({}).populate("blog").sort({createdAt:-1})
        res.json({success:true,comments})
    } catch (error) {
        res.json({seccess:false, message:error.message})
    }
}

export const getDashboardData = async(req,res)=>{
    try {
        const recentBlog = await Blog.find({}).sort({createdAt:-1}).limit(5)
        const blogs = await Blog.countDocuments()
        const comments = await Comment.countDocuments()
        const drafts = await Blog.countDocuments({isPublished:false})

        const dashBoardData = {
            recentBlog,blogs,comments,drafts
        }
        res.json({success:true,getDashboardData})
    } catch (error) {
        res.json({seccess:false, message:error.message})
    }
}

export const deleteCommentsById = async(req,res)=>{
    try {
        const {id} = req.body
        await Comment.findByIdAndDelete(id)
        res.json({success:true,message:"Comment deleted successfully"})
    } catch (error) {
        res.json({seccess:false, message:error.message})
    }
}

export const approvedCommentsById = async(req,res)=>{
    try {
        const {id} = req.body
        await Comment.findByIdAndUpdate(id , {isApproved:true})
        res.json({success:true,message:"Comment Approved successfully"})
    } catch (error) {
        res.json({seccess:false, message:error.message})
    }
}