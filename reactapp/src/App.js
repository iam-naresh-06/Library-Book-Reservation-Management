import React, { useState, useEffect } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import BorrowerForm from './components/BorrowerForm';
import BorrowerList from './components/BorrowerList';
import BorrowBook from './components/BorrowBook';
import BorrowerBorrows from './components/BorrowerBorrows';
import { getBooks, addBook, deleteBook } from './utils/api';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [borrowers, setBorrowers] = useState([]);
  const [selectedBorrower, setSelectedBorrower] = useState(null);
  const [activeTab, setActiveTab] = useState('books');

  useEffect(() => {
    const fetchData = async () => {
      const [bookData, borrowerData] = await Promise.all([
        getBooks(),
        getBorrowers()
      ]);
      setBooks(bookData);
      setBorrowers(borrowerData);
    };
    fetchData();
  }, []);

  const handleAddBook = async (book) => {
    const newBook = await addBook(book);
    setBooks([...books, newBook]);
  };

  const handleDeleteBook = async (id) => {
    await deleteBook(id);
    setBooks(books.filter(book => book.id !== id));
  };

  const handleBorrowBook = async (bookId) => {
    const updatedBooks = books.map(book => 
      book.id === bookId ? { ...book, available: false } : book
    );
    setBooks(updatedBooks);
  };

  const handleAddBorrower = async (borrower) => {
    const newBorrower = await addBorrower(borrower);
    setBorrowers([...borrowers, newBorrower]);
  };

  const handleBorrowSuccess = async () => {
    const updatedBooks = await getBooks();
    setBooks(updatedBooks);
  };
  return (
    <div className="App">
      <div className="tabs">
        <button onClick={() => setActiveTab('books')}>Books</button>
        <button onClick={() => setActiveTab('borrowers')}>Borrowers</button>
        <button onClick={() => setActiveTab('borrow')}>Borrow Book</button>
      </div>

      {activeTab === 'books' && (
        <div>
          <h2>Add New Book</h2>
          <BookForm onSubmit={handleAddBook} />
          <h2>Book List</h2>
          <BookList 
            books={books} 
            onDelete={handleDeleteBook} 
            onBorrow={handleBorrowBook} 
          />
        </div>
      )}

      {activeTab === 'borrowers' && (
        <div>
          <h2>Add New Borrower</h2>
          <BorrowerForm onSubmit={handleAddBorrower} />
          <h2>Borrower List</h2>
          <BorrowerList 
            borrowers={borrowers} 
            onSelect={setSelectedBorrower} 
          />
          {selectedBorrower && (
            <div>
              <h3>Active Borrows</h3>
              <BorrowerBorrows borrowerId={selectedBorrower} />
            </div>
          )}
        </div>
      )}

      {activeTab === 'borrow' && (
        <div>
          <h2>Borrow a Book</h2>
          <BorrowBook onBorrowSuccess={handleBorrowSuccess} />
        </div>
      )}
    </div>
  );
}

export default App;
// npm install --save-dev @testing-library/react @testing-library/jest-dom jest