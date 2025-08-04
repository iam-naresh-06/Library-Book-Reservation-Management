// src/components/BookForm.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const BookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    isbn: '',
    publicationYear: '',
    available: true
  });

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        try {
          const response = await api.get(`/books/${id}`);
          setBook(response.data);
        } catch (error) {
          console.error('Error fetching book:', error);
        }
      };
      fetchBook();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBook(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/books/${id}`, book);
      } else {
        await api.post('/books', book);
      }
      navigate('/books');
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Book' : 'Add New Book'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">ISBN</label>
          <input
            type="text"
            className="form-control"
            name="isbn"
            value={book.isbn}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Publication Year</label>
          <input
            type="number"
            className="form-control"
            name="publicationYear"
            value={book.publicationYear}
            onChange={handleChange}
          />
        </div>
        {id && (
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="available"
              checked={book.available}
              onChange={handleChange}
              id="availableCheck"
            />
            <label className="form-check-label" htmlFor="availableCheck">
              Available for borrowing
            </label>
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          {id ? 'Update' : 'Save'}
        </button>
      </form>
    </div>
  );
};
export default BookForm;