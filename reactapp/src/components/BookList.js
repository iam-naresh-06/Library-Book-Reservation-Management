// src/components/BookList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Book Inventory</h2>
      <Link to="/books/new" className="btn btn-primary mb-3">Add New Book</Link>
      
      {loading ? (
        <p>Loading books...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>
                  <span className={`badge ${book.available ? 'bg-success' : 'bg-danger'}`}>
                    {book.available ? 'Available' : 'Borrowed'}
                  </span>
                </td>
                <td>
                  <Link to={`/books/edit/${book.id}`} className="btn btn-sm btn-outline-secondary me-2">
                    Edit
                  </Link>
                  <Link to={`/borrow?bookId=${book.id}`} className="btn btn-sm btn-outline-primary" disabled={!book.available}>
                    Borrow
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookList;