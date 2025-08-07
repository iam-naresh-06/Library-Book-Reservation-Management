import React, { useEffect, useState } from 'react';
import { getBorrowers, getBooks, borrowBook } from '../utils/api';

export default function BorrowBook() {
  const [borrowers, setBorrowers] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedBorrower, setSelectedBorrower] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getBorrowers().then(setBorrowers);
    getBooks().then(setBooks);
  }, []);

  const handleBorrow = async () => {
    if (!selectedBorrower || !selectedBook) {
      return setError('Select both borrower and book');
    }

    await borrowBook({ borrower: selectedBorrower, isbn: selectedBook });
    setSelectedBorrower('');
    setSelectedBook('');
    setError('');
  };

  return (
    <div>
      {error && <p>[Error - You need to specify the message]</p>}
      <select value={selectedBorrower} onChange={e => setSelectedBorrower(e.target.value)}>
        <option value="">Select Borrower</option>
        {borrowers.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
      </select>

      <select value={selectedBook} onChange={e => setSelectedBook(e.target.value)}>
        <option value="">Select Book</option>
        {books.map(b => <option key={b.isbn} value={b.isbn}>{b.title}</option>)}
      </select>

      <button onClick={handleBorrow}>Borrow</button>
    </div>
  );
}
