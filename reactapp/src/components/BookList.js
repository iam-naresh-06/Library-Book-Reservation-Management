// src/components/BookList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    title: '',
    author: '',
    available: 'all'
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/books', { params: searchParams });
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [searchParams]);

  const filteredBooks = books.filter(book => {
    return (
      book.title.toLowerCase().includes(searchParams.title.toLowerCase()) &&
      book.author.toLowerCase().includes(searchParams.author.toLowerCase()) &&
      (searchParams.available === 'all' || 
       (searchParams.available === 'available' && book.available) ||
       (searchParams.available === 'borrowed' && !book.available))
    );
  });
return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Book Inventory</h2>
        <Link to="/books/new" className="btn-primary">
          Add New Book
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label>Title</label>
            <input
              type="text"
              placeholder="Search by title"
              value={searchParams.title}
              onChange={(e) => setSearchParams({...searchParams, title: e.target.value})}
            />
          </div>
          <div>
            <label>Author</label>
            <input
              type="text"
              placeholder="Search by author"
              value={searchParams.author}
              onChange={(e) => setSearchParams({...searchParams, author: e.target.value})}
            />
          </div>
          <div>
            <label>Availability</label>
            <select
              value={searchParams.available}
              onChange={(e) => setSearchParams({...searchParams, available: e.target.value})}
            >
              <option value="all">All</option>
              <option value="available">Available</option>
              <option value="borrowed">Borrowed</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="empty-state">Loading books...</div>
      ) : filteredBooks.length === 0 ? (
        <div className="empty-state">No books found</div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ISBN</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBooks.map(book => (
                <tr key={book.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{book.isbn}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      book.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {book.available ? 'Available' : 'Borrowed'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <Link
                      to={`/books/edit/${book.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/borrow?bookId=${book.id}`}
                      className={`${!book.available ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'}`}
                      onClick={(e) => !book.available && e.preventDefault()}
                    >
                      Borrow
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookList;