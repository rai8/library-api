const mongoose = require('mongoose')
const { Schema } = mongoose

//define schema
const booksSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
})
//define model

const Book = mongoose.model('Book', booksSchema)

//export model
module.exports = Book
