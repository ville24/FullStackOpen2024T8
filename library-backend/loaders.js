const DataLoader = require('dataloader')
const Book = require('./models/book')

const booksLoader = new DataLoader( async (ids) => {
  console.log('Book.find')
  const books = await Book.find({})
  return ids.map(id => books.filter(book => id.toString() === book.author.toString()).length)
})

module.exports = booksLoader