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
    <div data-testid="book-list">
      <div className="controls">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          data-testid="search-input"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          data-testid="filter-select"
        >
          <option value="all">All Books</option>
          <option value="available">Available</option>
          <option value="borrowed">Borrowed</option>
        </select>
      </div>
      
      {filteredBooks.length === 0 ? (
        <p data-testid="empty-message">No books found</p>
      ) : (
        <ul data-testid="books-container">
          {filteredBooks.map(book => (
            <li key={book.id} data-testid={`book-${book.id}`}>
              <span data-testid="book-title">{book.title}</span> by 
              <span data-testid="book-author">{book.author}</span>
              {book.available ? (
                <button
                  onClick={() => onBorrow(book.id)}
                  data-testid={`borrow-btn-${book.id}`}
                >
                  Borrow
                </button>
              ) : (
                <span data-testid="borrowed-label"> (Borrowed)</span>
              )}
              <button
                onClick={() => onDelete(book.id)}
                data-testid={`delete-btn-${book.id}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;