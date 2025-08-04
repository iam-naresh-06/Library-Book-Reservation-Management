// src/components/BorrowerList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const BorrowerList = () => {
  const [borrowers, setBorrowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBorrowers = async () => {
      try {
        const response = await api.get('/borrowers');
        setBorrowers(response.data);
      } catch (error) {
        console.error('Error fetching borrowers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBorrowers();
  }, []);

  return (
    <div>
      <h2>Borrower Management</h2>
      <Link to="/borrowers/new" className="btn btn-primary mb-3">Add New Borrower</Link>
      
      {loading ? (
        <p>Loading borrowers...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Member Since</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {borrowers.map(borrower => (
              <tr key={borrower.id}>
                <td>{borrower.name}</td>
                <td>{borrower.email}</td>
                <td>{borrower.phone}</td>
                <td>{new Date(borrower.membershipDate).toLocaleDateString()}</td>
                <td>
                  <Link 
                    to={`/borrower/${borrower.id}/borrows`} 
                    className="btn btn-sm btn-outline-info"
                  >
                    View Borrows
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BorrowerList;