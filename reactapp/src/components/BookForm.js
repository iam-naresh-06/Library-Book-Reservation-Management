import React, { useState } from 'react';

const BookForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.isbn.trim()) {
      newErrors.isbn = 'ISBN is required';
    } else if (formData.isbn.length !== 10 && formData.isbn.length !== 13) {
      newErrors.isbn = 'ISBN must be 10 or 13 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      setFormData({ title: '', author: '', isbn: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} data-testid="book-form">
      <div>
        <label>Title:</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          data-testid="title-input"
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>
      <div>
        <label>Author:</label>
        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          data-testid="author-input"
        />
        {errors.author && <span className="error">{errors.author}</span>}
      </div>
      <div>
        <label>ISBN:</label>
        <input
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          data-testid="isbn-input"
        />
        {errors.isbn && <span className="error">{errors.isbn}</span>}
      </div>
      <button type="submit" data-testid="submit-button">Add Book</button>
    </form>
  );
};

export default BookForm;