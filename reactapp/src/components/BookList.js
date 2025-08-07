import React, { useEffect, useState } from 'react';
import { api } from '../utils/api';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  const loadBooks = async () => {
    const data = await api.getBooks();
    setBooks(data);
  };

  useEffect(() => { loadBooks(); }, []);

  const deleteBook = async (isbn) => {
    await api.deleteBook(isbn);
    loadBooks();
  };

  const filteredBooks = books.filter(b => b.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <input
        data-testid="search"
        placeholder="Search by title"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {filteredBooks.length === 0 ? (
        <p>No books found</p>
      ) : (
        <ul>
          {filteredBooks.map(b => (
            <li key={b.isbn}>
              {b.title} - {b.author}
              <button onClick={() => deleteBook(b.isbn)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
