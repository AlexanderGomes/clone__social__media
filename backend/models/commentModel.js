const mongoose = require('mongoose')


const commentSchema = mongooseSchema (
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Post'
        },
        desc: {
            type: String,
            requied: true,
        }
    },
{timestamps: true}
)


module.exports = mongoose.model('Comment', commentSchema)