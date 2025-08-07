import React, { useState } from 'react';

const BookForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!title) newErrors.title = 'Title is required';
    if (!author) newErrors.author = 'Author is required';
    if (!isbn) newErrors.isbn = 'ISBN is required';
    else if (isbn.length !== 10 && isbn.length !== 13) newErrors.isbn = 'ISBN must be 10 or 13 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ title, author, isbn });
      setTitle('');
      setAuthor('');
      setIsbn('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        {errors.title && <span>{errors.title}</span>}
      </div>
      <div>
        <label>Author:</label>
        <input value={author} onChange={(e) => setAuthor(e.target.value)} />
        {errors.author && <span>{errors.author}</span>}
      </div>
      <div>
        <label>ISBN:</label>
        <input value={isbn} onChange={(e) => setIsbn(e.target.value)} />
        {errors.isbn && <span>{errors.isbn}</span>}
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default BookForm;