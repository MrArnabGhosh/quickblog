import express from 'express'
import { adminLogin, approvedCommentsById, deleteCommentsById, getAllBlogsAdmin, getAllComments, getDashboardData } from '../controllers/adminControllers.js'
import auth from '../middlewares/authMiddleware.js'


const adminRouter = express.Router()

adminRouter.post("/login",adminLogin)
adminRouter.get("/comments", auth, getAllComments)
adminRouter.get("/blogs",auth,getAllBlogsAdmin)
adminRouter.post("/delete-comment",auth,deleteCommentsById)
adminRouter.post("/approve-comment",auth,approvedCommentsById)
adminRouter.get("/dashboard",auth , getDashboardData)



export default adminRouter