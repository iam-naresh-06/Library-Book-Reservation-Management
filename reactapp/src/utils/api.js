import axios from 'axios';

const API_BASE_URL = '/api';

export const addBook = (book) => axios.post(`${API_BASE_URL}/books`, book);
export const updateBook = (id, book) => axios.put(`${API_BASE_URL}/books/${id}`, book);
export const getBook = (id) => axios.get(`${API_BASE_URL}/books/${id}`);
export const fetchBooks = () => axios.get(`${API_BASE_URL}/books`);
export const deleteBook = (id) => axios.delete(`${API_BASE_URL}/books/${id}`);

export const addBorrower = (borrower) => axios.post(`${API_BASE_URL}/borrowers`, borrower);
export const updateBorrower = (id, borrower) => axios.put(`${API_BASE_URL}/borrowers/${id}`, borrower);
export const getBorrower = (id) => axios.get(`${API_BASE_URL}/borrowers/${id}`);
export const fetchBorrowers = () => axios.get(`${API_BASE_URL}/borrowers`);
export const deleteBorrower = (id) => axios.delete(`${API_BASE_URL}/borrowers/${id}`);

export const borrowBook = (borrowData) => axios.post(`${API_BASE_URL}/borrow`, borrowData);
export const returnBook = (borrowId) => axios.post(`${API_BASE_URL}/return/${borrowId}`);
export const getActiveBorrowsByBorrower = (borrowerId) => axios.get(`${API_BASE_URL}/borrowers/${borrowerId}/borrows`);
