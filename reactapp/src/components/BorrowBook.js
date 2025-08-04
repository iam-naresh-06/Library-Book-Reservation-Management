// src/components/BorrowBook.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const BorrowBook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const bookId = queryParams.get('bookId');
  
  const [borrowers, setBorrowers] = useState([]);
  const [selectedBorrower, setSelectedBorrower] = useState('');
  const [book, setBook] = useState(null);
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [borrowersRes, bookRes] = await Promise.all([
          api.get('/borrowers'),
          bookId ? api.get(`/books/${bookId}`) : Promise.resolve(null)
        ]);
        
        setBorrowers(borrowersRes.data);
        if (bookRes) setBook(bookRes.data);
        
        // Set default due date (2 weeks from now)
        const twoWeeksLater = new Date();
        twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);
        setDueDate(twoWeeksLater.toISOString().split('T')[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, [bookId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/borrow', {
        bookId: bookId || book.id,
        borrowerId: selectedBorrower,
        dueDate
      });
      navigate('/books');
    } catch (error) {
      console.error('Error creating borrow record:', error);
    }
  };
  return (
    <div>
      <h2>Borrow Book</h2>
      {book && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{book.title}</h5>
            <p className="card-text">by {book.author}</p>
            <p className="card-text">ISBN: {book.isbn}</p>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Select Borrower</label>
          <select
            className="form-select"
            value={selectedBorrower}
            onChange={(e) => setSelectedBorrower(e.target.value)}
            required
          >
            <option value="">-- Select Borrower --</option>
            {borrowers.map(borrower => (
              <option key={borrower.id} value={borrower.id}>
                {borrower.name} ({borrower.email})
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-3">
          <label className="form-label">Due Date</label>
          <input
            type="date"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          Complete Borrowing
        </button>
      </form>
    </div>
  );
};

export default BorrowBook;