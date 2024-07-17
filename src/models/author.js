const mongoose = require("mongoose");

//creating author schema
const authorSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    surname:{
        type:String,
        require:true,
        trim:true
    }
})

authorSchema.virtual("books",{
    ref:"Book",
    localField:"_id",
    foreignField:"author"
})

const Author = new mongoose.model("Author", authorSchema);

module.exports = Author;