const mongoose = require('mongoose')


const commentSchema = mongoose.Schema (
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Post'
        },
        desc: {
            type: String,
            required: true,
        }
    },
{timestamps: true}
)


module.exports = mongoose.model('Comment', commentSchema)