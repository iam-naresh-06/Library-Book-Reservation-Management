import React, { useState } from 'react';
import * as api from '../utils/api';

const BookForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    publicationYear: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.isbn.trim()) {
      newErrors.isbn = 'ISBN is required';
    } else if (formData.isbn.length !== 13) {
      newErrors.isbn = 'ISBN must be exactly 13 characters';
    }
    if (!formData.publicationYear) {
      newErrors.publicationYear = 'Publication Year is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await api.addBook({
        ...formData,
        publicationYear: parseInt(formData.publicationYear)
      });
      setFormData({
        title: '',
        author: '',
        isbn: '',
        publicationYear: ''
      });
      setErrors({});
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };
 return (
    <form onSubmit={handleSubmit} className="book-form">
      <h2>Add New Book</h2>
      {errors.submit && <div className="error-message">{errors.submit}</div>}
      
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>
      
      <div className="form-group">
        <label>Author:</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className={errors.author ? 'error' : ''}
        />
        {errors.author && <span className="error-message">{errors.author}</span>}
      </div>
      
      <div className="form-group">
        <label>ISBN:</label>
        <input
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          className={errors.isbn ? 'error' : ''}
        />
        {errors.isbn && <span className="error-message">{errors.isbn}</span>}
      </div>
      
      <div className="form-group">
        <label>Publication Year:</label>
        <input
          type="number"
          name="publicationYear"
          value={formData.publicationYear}
          onChange={handleChange}
          className={errors.publicationYear ? 'error' : ''}
        />
        {errors.publicationYear && (
          <span className="error-message">{errors.publicationYear}</span>
        )}
      </div>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
};

export default BookForm;