import React, { useState } from 'react';

const BorrowBook = ({ onBorrowSuccess }) => {
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedBorrower, setSelectedBorrower] = useState('');
  const [error, setError] = useState('');

  // Mock data that would come from API in real app
  const availableBooks = [
    { id: '1', title: 'Book 1', isbn: '1234567890' },
    { id: '2', title: 'Book 2', isbn: '0987654321' }
  ];
  
  const borrowers = [
    { id: '1', name: 'Borrower 1' },
    { id: '2', name: 'Borrower 2' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedBook || !selectedBorrower) {
      setError('Please select both a book and a borrower');
      return;
    }
    
    // Simulate successful borrow
    onBorrowSuccess();
    setSelectedBook('');
    setSelectedBorrower('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} data-testid="borrow-form">
      {error && <p className="error" data-testid="error-message">[Error - You need to specify the message]</p>}
      
      <div>
        <label>Book:</label>
        <select
          value={selectedBook}
          onChange={(e) => setSelectedBook(e.target.value)}
          data-testid="book-select"
        >
          <option value="">Select a book</option>
          {availableBooks.map(book => (
            <option key={book.id} value={book.id} data-testid={`book-option-${book.id}`}>
              {book.title} (ISBN: {book.isbn})
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label>Borrower:</label>
        <select
          value={selectedBorrower}
          onChange={(e) => setSelectedBorrower(e.target.value)}
          data-testid="borrower-select"
        >
          <option value="">Select a borrower</option>
          {borrowers.map(borrower => (
            <option key={borrower.id} value={borrower.id} data-testid={`borrower-option-${borrower.id}`}>
              {borrower.name}
            </option>
          ))}
        </select>
      </div>
      
      <button type="submit" data-testid="submit-borrow">Borrow Book</button>
    </form>
  );
};

export default BorrowBook;