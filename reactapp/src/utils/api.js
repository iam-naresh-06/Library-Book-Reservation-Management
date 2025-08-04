// import axios from 'axios';
// const BASE_URL = 'http://localhost:8080/api/complaints';

// const ComplaintService = {
//   getAllComplaints: () => axios.get(BASE_URL),
//   getComplaintById: (id) => axios.get(`${BASE_URL}/${id}`),
//   createComplaint: (complaint) => axios.post(BASE_URL, complaint),
//   updateComplaint: (id, complaint) => axios.put(`${BASE_URL}/${id}`, complaint),
//   deleteComplaint: (id) => axios.delete(`${BASE_URL}/${id}`),
//   getComplaintsByStatus: (status) => axios.get(`${BASE_URL}/status/${encodeURIComponent(status)}`),
//   getComplaintsByCategory: (category) => axios.get(`${BASE_URL}/category/${encodeURIComponent(category)}`)
// };
// export default ComplaintService;
// src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Update with your backend URL
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Response interceptor
api.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    // Handle unauthorized access
  }
  return Promise.reject(error);
});

export default api;