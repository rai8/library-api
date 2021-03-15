const Book = require('../models/Book')

const createBook = async (req, res) => {
  try {
    let book = req.body
    const newBook = new Book(book)
    await newBook.save()

    res.status(201).json({ message: 'Book added successfully', book: newBook })
  } catch (err) {
    console.log(err)
  }
}
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({})
    res.status(200).json(books)
  } catch (err) {
    console.log(err.message)
  }
}

const getSingleBook = async (req, res) => {
  try {
    const book = await Book.find({ title: req.params.title })
    res.status(200).json(book)
  } catch (err) {
    console.log(err.message)
  }
}

const updateBook = (req, res) => {
  Book.findById(req.params.id, function (err, updatedBook) {
    if (err) res.json(err.message)
    updatedBook.title = req.body.title
    updatedBook.author = req.body.author
    updatedBook.description = req.body.description
    updatedBook.content = req.body.content
    // save the contact and check for errors
    updatedBook.save(function (err) {
      if (err) res.json(err.message)
      res.json(updatedBook)
    })
  })
}

const updateBookPatch = (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedBook => {
      if (!updatedBook) {
        return res.status(404).json('Book does not exist')
      }
      res.status(200).json(updatedBook)
    })
    .catch(error => {
      res.status(500).json(error.message)
    })
}

const deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id)
    res.status(201).json('Book deleted successfully')
  } catch (err) {
    res.status(400).json(err.message)
  }
}
module.exports = { getAllBooks, createBook, getSingleBook, updateBook, updateBookPatch, deleteBook }
