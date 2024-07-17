const express = require("express");
const hbs = require('hbs');
const path = require("path");
const fs = require('fs');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);
require("./db/mongoose");
const Book = require("./models/book");
const Author = require("./models/author");

//creating app
const app = express();

//creating dirs
const publicDir = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,"../templates/views");

//setting up app
app.set('view engine', 'hbs');
app.set("views", viewsPath);
app.use(express.static(publicDir));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3000;

//setting up routes
app.get('/', async(req, res) => {
    const books = await Book.find({}).populate('author','name surname');
    const authors = await Author.find({});
    res.render('index', { books,authors });
});

app.post('/book', async (req, res) => {    
    const book = new Book(req.body);
    await book.save()
    res.redirect('/');  
});
app.delete("/book", async(req,res)=>{
    await Book.findByIdAndDelete(req.body.id)
    res.json();
})
app.patch("/book", async(req,res)=>{    
    await Book.findByIdAndUpdate(req.body.id, {
        title:req.body.title,
        author:req.body.author,
        description:req.body.description
    })
    res.json();
})
//filter
app.get("/book",async(req,res)=>{
    //no filter
    if(req.query.filter==="no"||!req.query.filterName){
        const books = await Book.find({}).populate('author', 'name surname');
        return res.json({books});
    }
    //filter by title
    if(req.query.filter==="title"){
        const books = await Book.find({title:{$regex:req.query.filterName,$options: 'i' }}).populate('author', 'name surname');
        return res.json({books});
    }
    //filter by author
    if(req.query.filter==="author"){
        if (!req.query.filterName) {
            return res.json({ books: [] });
        }
        const books = await Book.find({ author: {$regex:req.query.filterName,$options: 'i' } }).populate('author', 'name surname');
        return res.json({books});
    }
})
app.post('/author', async (req, res) => {
    const author = new Author(req.body);
    await author.save()
    res.redirect('/authors');
});

app.get("/authors",async (req,res)=>{
    const authors = await Author.find({});
    res.render("authors",{authors});
})
app.delete("/author", async(req,res)=>{
    await Book.deleteMany({author:req.body.id});
    await Author.findByIdAndDelete(req.body.id);
    res.json();
})
//export books into json file
app.get("/export", async(req,res)=>{    
    const books = await Book.find({}).populate('author', 'name surname');
    const jsonBooks = books.map(book => ({
        title: book.title,
        author: `${book.author.name} ${book.author.surname}`,
        description: book.description
    }));

    const filePath = path.join(__dirname, 'books.json');
    await writeFileAsync(filePath, JSON.stringify(jsonBooks, null, 2));

    res.download(filePath, 'books.json', (err) => {
        fs.unlinkSync(filePath);
    });
})

app.listen(port,()=>{
    console.log("Server running on port " + port);
})