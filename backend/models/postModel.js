const mongoose = require('mongoose')



const postSchema = mongoose.Schema (
    {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User'
        },
        img: {
            type: String
          },
        text: {
            type: String,
            required: [true, 'Please add a text value']
        },
        likes: {
            type: Array,
            default: [],
        },
    },
    {timestamps: true}
)


module.exports = mongoose.model('Post', postSchema)