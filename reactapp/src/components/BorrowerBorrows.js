import React, { useState, useEffect } from 'react';
import { getBorrows, returnBook } from '../utils/api';

const BorrowerBorrows = ({ borrowerId }) => {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBorrows = async () => {
      const data = await getBorrows(borrowerId);
      setBorrows(data);
      setLoading(false);
    };
    fetchBorrows();
  }, [borrowerId]);

  const handleReturn = async (borrowId) => {
    await returnBook(borrowId);
    setBorrows(borrows.filter(borrow => borrow.id !== borrowId));
  };

  if (loading) return <p>Loading...</p>;
  if (borrows.length === 0) return <p>No active borrows</p>;

  return (
    <ul>
      {borrows.map(borrow => (
        <li key={borrow.id}>
          {borrow.book.title} (Due: {new Date(borrow.dueDate).toLocaleDateString()})
          <button onClick={() => handleReturn(borrow.id)}>Return</button>
        </li>
      ))}
    </ul>
  );
};

export default BorrowerBorrows;