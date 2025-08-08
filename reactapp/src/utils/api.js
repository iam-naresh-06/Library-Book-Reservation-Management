const API_BASE_URL = 'http://localhost:3001/api';

export const fetchBooks = async () => {
  const response = await fetch(`${API_BASE_URL}/books`);
  if (!response.ok) throw new Error('Failed to fetch books');
  return response.json();
};

export const addBook = async (bookData) => {
  const response = await fetch(`${API_BASE_URL}/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookData),
  });
  if (!response.ok) throw new Error('Failed to add book');
  return response.json();
};

export const deleteBook = async (id) => {
  const response = await fetch(`${API_BASE_URL}/books/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete book');
  return response.json();
};

export const fetchBorrowers = async () => {
  const response = await fetch(`${API_BASE_URL}/borrowers`);
  if (!response.ok) throw new Error('Failed to fetch borrowers');
  return response.json();
};

export const getActiveBorrowsByBorrower = async (borrowerId) => {
  const response = await fetch(`${API_BASE_URL}/borrowers/${borrowerId}/borrows`);
  if (!response.ok) throw new Error('Failed to fetch active borrows');
  return response.json();
};

export const borrowBook = async (borrowData) => {
  const response = await fetch(`${API_BASE_URL}/borrows`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(borrowData),
  });
  if (!response.ok) throw new Error('Failed to borrow book');
  return response.json();
};

export const returnBook = async (borrowId) => {
  const response = await fetch(`${API_BASE_URL}/borrows/${borrowId}/return`, {
    method: 'PUT',
  });
  if (!response.ok) throw new Error('Failed to return book');
  return response.json();
};