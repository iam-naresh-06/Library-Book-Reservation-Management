const books = [];
const borrowers = [];
const borrows = [];

export const getBooks = () => Promise.resolve([...books]);

export const addBook = (book) => {
  const id = Date.now().toString();
  const newBook = { ...book, id, available: true };
  books.push(newBook);
  return Promise.resolve(newBook);
};

export const deleteBook = (id) => {
  const index = books.findIndex((b) => b.id === id);
  if (index !== -1) books.splice(index, 1);
  return Promise.resolve();
};

export const getBorrowers = () => Promise.resolve([...borrowers]);

export const addBorrower = (borrower) => {
  const id = Date.now().toString();
  const newBorrower = { ...borrower, id };
  borrowers.push(newBorrower);
  return Promise.resolve(newBorrower);
};

export const borrowBook = ({ borrowerId, bookId }) => {
  borrows.push({ borrowerId, bookId, date: new Date().toISOString() });
  const book = books.find(b => b.id === bookId);
  if (book) book.available = false;
  return Promise.resolve();
};

export const returnBook = (bookId) => {
  const index = borrows.findIndex(b => b.bookId === bookId);
  if (index !== -1) borrows.splice(index, 1);
  const book = books.find(b => b.id === bookId);
  if (book) book.available = true;
  return Promise.resolve();
};

export const getActiveBorrows = () => Promise.resolve([...borrows]);
