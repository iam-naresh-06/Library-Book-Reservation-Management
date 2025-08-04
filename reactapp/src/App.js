// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/Auth';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="container">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<BookList />} />
              <Route path="/books" element={<BookList />} />
              <Route path="/books/new" element={<BookForm />} />
              <Route path="/books/edit/:id" element={<BookForm />} />
              <Route path="/borrowers" element={<BorrowerList />} />
              <Route path="/borrow" element={<BorrowBook />} />
              <Route path="/borrower/:id/borrows" element={<BorrowerBorrows />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/fines" element={<FineManagement />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;