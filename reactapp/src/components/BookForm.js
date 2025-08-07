import React, { useState } from 'react';
import { addBook } from '../utils/api';

export default function BookForm({ onBookAdded }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [pubYear, setPubYear] = useState(''); // Added publication year
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author || !isbn || !pubYear) {
      return setError('All fields are required');
    }
    if (isbn.length !== 13) {
      return setError('ISBN must be 13 characters long');
    }

    await addBook({ title, author, isbn, publicationYear: pubYear });
    onBookAdded();
    setTitle('');
    setAuthor('');
    setIsbn('');
    setPubYear('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} data-testid="book-form">
      {error && <p className="error">[Error - You need to specify the message]</p>}
      
      <div>
        <label htmlFor="title">Title:</label>
        <input 
          id="title"
          placeholder="Title" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
        />
      </div>
      
      <div>
        <label htmlFor="author">Author:</label>
        <input 
          id="author"
          placeholder="Author" 
          value={author} 
          onChange={e => setAuthor(e.target.value)} 
        />
      </div>
      
      <div>
        <label htmlFor="isbn">ISBN:</label>
        <input 
          id="isbn"
          placeholder="ISBN" 
          value={isbn} 
          onChange={e => setIsbn(e.target.value)} 
        />
      </div>
      
      <div>
        <label htmlFor="pubYear">Publication Year:</label>
        <input 
          id="pubYear"
          placeholder="Publication Year" 
          value={pubYear} 
          onChange={e => setPubYear(e.target.value)} 
        />
      </div>
      
      <button type="submit">Add Book</button>
    </form>
  );
}