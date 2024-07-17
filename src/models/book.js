const mongoose = require("mongoose");

//creating book schema
const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        require:true
    },
    description:{
        type:String,
        trim:true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    }
})

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;