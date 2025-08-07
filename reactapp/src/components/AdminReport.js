import React, { useEffect, useState } from 'react';
import { getActiveBorrows } from '../utils/api';

const AdminReport = () => {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBorrows = async () => {
      try {
        const response = await getActiveBorrows();
        setBorrows(response.data);
      } catch (err) {
        setError('Failed to load active borrows');
      } finally {
        setLoading(false);
      }
    };

    fetchBorrows();
  }, []);

  if (loading) return <p>Loading report...</p>;
  if (error) return <p>[Error - You need to specify the message]</p>;

  return (
    <div className="container mt-4">
      <h2>Admin Report: Active Borrows</h2>
      {borrows.length === 0 ? (
        <p>No active borrows.</p>
      ) : (
        <table className="table table-bordered table-striped mt-3">
          <thead className="thead-dark">
            <tr>
              <th>Borrow ID</th>
              <th>Book Title</th>
              <th>Borrower Name</th>
              <th>Borrow Date</th>
            </tr>
          </thead>
          <tbody>
            {borrows.map((borrow) => (
              <tr key={borrow.id}>
                <td>{borrow.id}</td>
                <td>{borrow.bookTitle}</td>
                <td>{borrow.borrowerName}</td>
                <td>{new Date(borrow.borrowDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminReport;
