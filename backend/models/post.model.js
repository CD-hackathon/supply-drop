const mongoose = require('mongoose')
const Schema = mongoose.Schema;
let PostSchema = new Schema({

    looking: {
        type: Boolean,
    },

    offering: {
        type: Boolean,
    },

    title: {
        type: String,
        required: [true, "Post must have a title"],
        minlength: [5, "Title needs to be 5 characters long"],
        maxlength: [100, "Title cannot be longer then 100 characters"]
    },

    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [20, "Description needs to be longer then 20 characters long"]
    },

    image: {
        type: String,
        default: null
    },

    location: {
        type: String,
        required: [true, "A postal code is required"]
    },

    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "You need to logged in to create a post"]
    }
}, { timeseries: true });

module.exports.Post = mongoose.model('Post', PostSchema);