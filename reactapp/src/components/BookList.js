import React, { useState } from 'react';

const BookList = ({ books, onDelete, onBorrow }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'available' && book.available) || 
                         (filter === 'borrowed' && !book.available);
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <div>
        <input 
          placeholder="Search books..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Books</option>
          <option value="available">Available</option>
          <option value="borrowed">Borrowed</option>
        </select>
      </div>
      {filteredBooks.length === 0 ? (
        <p>No books found</p>
      ) : (
        <ul>
          {filteredBooks.map(book => (
            <li key={book.id}>
              {book.title} by {book.author} (ISBN: {book.isbn})
              {book.available ? (
                <button onClick={() => onBorrow(book.id)}>Borrow</button>
              ) : (
                <span> - Borrowed</span>
              )}
              <button onClick={() => onDelete(book.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;