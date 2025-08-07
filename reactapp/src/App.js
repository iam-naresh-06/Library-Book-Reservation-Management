// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import BorrowBook from "./components/BorrowBook";
import BorrowerForm from "./components/BorrowerForm";
import BorrowerBorrows from "./components/BorrowerBorrows";
import AdminReport from "./components/AdminReport";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./components/LoginPage";
import { AuthProvider } from "./components/Auth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Container className="mt-4">
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes (accessible by authenticated users only) */}
            <Route element={<ProtectedRoute roles={['admin', 'user']} />}>
              <Route path="/" element={<BookList />} />
              <Route path="/borrow-book" element={<BorrowBook />} />
              <Route path="/borrower-borrows" element={<BorrowerBorrows />} />
            </Route>

            {/* Admin-only Routes */}
            <Route element={<ProtectedRoute roles={['admin']} />}>
              <Route path="/admin-report" element={<AdminReport />} />
              <Route path="/add-book" element={<BookForm />} />
              <Route path="/add-borrower" element={<BorrowerForm />} />
            </Route>

            {/* Unauthorized fallback */}
            <Route path="/unauthorized" element={<h2>Unauthorized Access</h2>} />

            {/* 404 Fallback */}
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
