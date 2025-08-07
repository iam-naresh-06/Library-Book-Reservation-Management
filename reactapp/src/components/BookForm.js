import React, { useState } from 'react';
import { api } from '../utils/api';

export default function BookForm({ onBookAdded }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author || !isbn) {
      return setError('All fields are required');
    }
    if (isbn.length !== 13) {
      return setError('ISBN must be 13 characters long');
    }

    await api.addBook({ title, author, isbn });
    onBookAdded();
    setTitle('');
    setAuthor('');
    setIsbn('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} data-testid="book-form">
      {error && <p>[Error - You need to specify the message]</p>}
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} />
      <input placeholder="ISBN" value={isbn} onChange={e => setIsbn(e.target.value)} />
      <button type="submit">Add Book</button>
    </form>
  );
}
