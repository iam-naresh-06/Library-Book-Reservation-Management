// src/components/BookForm.js
import React, { useState, useEffect } from 'react';
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
  const [errors, setErrors] = useState({});

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

  const validate = () => {
    const newErrors = {};
    if (!book.title) newErrors.title = 'Title is required';
    if (!book.author) newErrors.author = 'Author is required';
    if (!book.isbn) newErrors.isbn = 'ISBN is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

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
    <div className="form-container">
      <h2 className="text-xl font-semibold mb-4">
        {id ? 'Edit Book' : 'Add New Book'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            value={book.title}
            onChange={(e) => setBook({...book, title: e.target.value})}
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="author">Author</label>
          <input
            id="author"
            type="text"
            name="author"
            value={book.author}
            onChange={(e) => setBook({...book, author: e.target.value})}
            className={errors.author ? 'error' : ''}
          />
          {errors.author && <p className="error">{errors.author}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="isbn">ISBN</label>
          <input
            id="isbn"
            type="text"
            name="isbn"
            value={book.isbn}
            onChange={(e) => setBook({...book, isbn: e.target.value})}
            className={errors.isbn ? 'error' : ''}
          />
          {errors.isbn && <p className="error">{errors.isbn}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="publicationYear">Publication Year</label>
          <input
            id="publicationYear"
            type="number"
            name="publicationYear"
            value={book.publicationYear}
            onChange={(e) => setBook({...book, publicationYear: e.target.value})}
          />
        </div>

        {id && (
          <div className="mb-4 flex items-center">
            <input
              id="available"
              type="checkbox"
              name="available"
              checked={book.available}
              onChange={(e) => setBook({...book, available: e.target.checked})}
              className="mr-2"
            />
            <label htmlFor="available" className="mb-0">Available for borrowing</label>
          </div>
        )}
        <div className="flex justify-between">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/books')}
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            {id ? 'Update Book' : 'Add Book'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;