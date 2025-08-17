import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    comment : {
        type : String,
        required : true
    },
    blog : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'blog'
    },
    isApproved : {
        type : Boolean,
        default : false
    }

}, { timestamps : true })

const Comment = mongoose.model('comment', commentSchema)

export default Comment