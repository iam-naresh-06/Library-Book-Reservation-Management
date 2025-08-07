// Mock data
let mockBooks = [
  { id: '1', title: 'Book 1', author: 'Author 1', isbn: '1234567890', available: true },
  { id: '2', title: 'Book 2', author: 'Author 2', isbn: '0987654321', available: false }
];

let mockBorrowers = [
  { id: '1', name: 'Borrower 1', email: 'borrower1@example.com' },
  { id: '2', name: 'Borrower 2', email: 'borrower2@example.com' }
];

let mockBorrows = [
  { id: '1', bookId: '2', borrowerId: '1', dueDate: '2023-12-31', book: mockBooks[1] }
];

// Book functions
export const getBooks = async () => [...mockBooks];
export const addBook = async (book) => {
  const newBook = { ...book, id: Date.now().toString(), available: true };
  mockBooks.push(newBook);
  return newBook;
};
export const deleteBook = async (id) => {
  mockBooks = mockBooks.filter(book => book.id !== id);
};

// Borrower functions
export const getBorrowers = async () => [...mockBorrowers];
export const addBorrower = async (borrower) => {
  const newBorrower = { ...borrower, id: Date.now().toString() };
  mockBorrowers.push(newBorrower);
  return newBorrower;
};

// Borrow functions
export const getBorrows = async (borrowerId) => 
  mockBorrows.filter(borrow => borrow.borrowerId === borrowerId);

export const createBorrow = async (bookId, borrowerId) => {
  const book = mockBooks.find(b => b.id === bookId);
  if (book) book.available = false;
  
  const newBorrow = {
    id: Date.now().toString(),
    bookId,
    borrowerId,
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    book: mockBooks.find(b => b.id === bookId)
  };
  mockBorrows.push(newBorrow);
  return newBorrow;
};

export const returnBook = async (borrowId) => {
  const borrow = mockBorrows.find(b => b.id === borrowId);
  if (borrow) {
    const book = mockBooks.find(b => b.id === borrow.bookId);
    if (book) book.available = true;
    mockBorrows = mockBorrows.filter(b => b.id !== borrowId);
  }
};