// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import BorrowerList from './components/BorrowerList';
import BorrowBook from './components/BorrowBook';
import BorrowerBorrows from './components/BorrowerBorrows';
// import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/books/new" element={<BookForm />} />
            <Route path="/books/edit/:id" element={<BookForm />} />
            <Route path="/borrowers" element={<BorrowerList />} />
            <Route path="/borrow" element={<BorrowBook />} />
            <Route path="/borrower/:id/borrows" element={<BorrowerBorrows />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;