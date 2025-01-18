const Book=require('./models/Book')
const getBooks=async(require,res)=>{
    try{
        const books=await Book.find()
        res.json(books)
    }catch(err){
        res.status(500).json({message:err.message})
    }
};
//add books

const addBook=async(req,res)=>{
    const { title, author, description, coverImage, content } = req.body;
    try{
        const newBook = new Book({ title, author, description, coverImage, content });
        await newBook.save();
        res.status(201).json(newBook);
    }catch(err){
        res.status(500).json({message:err.message})
    }
};
//delete book
const deleteBook =async(req,res) => {
    try{
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({message:' book deleted successfully'});

    }catch(err){
        res.status(500).json({message:err.message})
    }
};
module.exports={getBooks,addBook,deleteBook};