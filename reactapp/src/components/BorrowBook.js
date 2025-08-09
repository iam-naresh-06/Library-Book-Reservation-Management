import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';

const BorrowBook = () => {
  const [books, setBooks] = useState([]);
  const [borrowers, setBorrowers] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [selectedBorrowerId, setSelectedBorrowerId] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [booksRes, borrowersRes] = await Promise.all([
          api.fetchBooks(),
          api.fetchBorrowers()
        ]);
        setBooks(booksRes.data);
        setBorrowers(borrowersRes.data);
      } catch (err) {
        setError(err.message);
      }
    };
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedBookId || !selectedBorrowerId) {
      setError('Please select both a book and a borrower');
      return;
    }

    try {
      await api.borrowBook({
        bookId: selectedBookId,
        borrowerId: selectedBorrowerId
      });
      setSelectedBookId('');
      setSelectedBorrowerId('');
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="borrow-book">
      <h2>Borrow a Book</h2>
      
      {error && <div className="error-message">[Error - You need to specify the message]</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="book-select">Select Book:</label>
          <select 
            id="book-select"
            value={selectedBookId} 
            onChange={(e) => setSelectedBookId(e.target.value)}
            data-testid="book-select"
          >
            <option value="">-- Select a book --</option>
            {books.map(book => (
              <option key={book.id} value={book.id}>
                {book.title} by {book.author}
              </option>
            ))}
          </select>
        </div>
        
   
        <div className="form-group">
          <label htmlFor="borrower-select">Select Borrower:</label>
          <select 
            id="borrower-select"
            value={selectedBorrowerId} 
            onChange={(e) => setSelectedBorrowerId(e.target.value)}
            data-testid="borrower-select"
          >
            <option value="">-- Select a borrower --</option>
            {borrowers.map(borrower => (
              <option key={borrower.id} value={borrower.id}>
                {borrower.name} ({borrower.email})
              </option>
            ))}
          </select>
        </div>
        
        <button type="submit" data-testid="borrow-button">
          Borrow
        </button>
      </form>
    </div>
  );
};

export default BorrowBook;