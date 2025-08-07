import React, { useState, useEffect } from 'react';
import { getBooks, getBorrowers, createBorrow } from '../utils/api';

const BorrowBook = ({ onBorrowSuccess }) => {
  const [books, setBooks] = useState([]);
  const [borrowers, setBorrowers] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedBorrower, setSelectedBorrower] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const [bookData, borrowerData] = await Promise.all([
        getBooks(),
        getBorrowers()
      ]);
      setBooks(bookData.filter(book => book.available));
      setBorrowers(borrowerData);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBook || !selectedBorrower) {
      setError('Please select both a book and a borrower');
      return;
    }
    
    try {
      await createBorrow(selectedBook, selectedBorrower);
      onBorrowSuccess();
      setSelectedBook('');
      setSelectedBorrower('');
      setError('');
    } catch (err) {
      setError('Failed to create borrow record');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>[Error - You need to specify the message]</p>}
      <div>
        <label>Book:</label>
        <select 
          value={selectedBook} 
          onChange={(e) => setSelectedBook(e.target.value)}
        >
          <option value="">Select a book</option>
          {books.map(book => (
            <option key={book.id} value={book.id}>
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
        >
          <option value="">Select a borrower</option>
          {borrowers.map(borrower => (
            <option key={borrower.id} value={borrower.id}>
              {borrower.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Borrow Book</button>
    </form>
  );
};

export default BorrowBook;