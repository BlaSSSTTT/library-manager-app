const mongoose = require("mongoose");

const url = "mongodb+srv://antonchykvladyslav:12345@library.ksncrnr.mongodb.net/?retryWrites=true&w=majority&appName=Library";

//connect to database
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });