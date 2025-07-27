import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    blog:{type:mongoose.Types.ObjectId, ref:'blog' , required:true},
    name:{type:String,required:true},
    content:{type:String,required:true},
    isApproved:{type:Boolean,default:false},
    user: { // <-- This is essential: links a comment to the user who wrote it
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
},{timestamps:true})

const Comment = mongoose.model('comment',commentSchema)

export default Comment

