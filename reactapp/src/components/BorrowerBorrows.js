import React, { useEffect, useState } from 'react';
import { api } from '../utils/api';

export default function BorrowerBorrows() {
  const [borrows, setBorrows] = useState([]);

  const loadBorrows = async () => {
    const data = await api.getActiveBorrows();
    setBorrows(data);
  };

  useEffect(() => {
    loadBorrows();
  }, []);

  const handleReturn = async (isbn) => {
    await api.returnBook(isbn);
    loadBorrows();
  };

  return (
    <div>
      {borrows.length === 0 ? (
        <p>No active borrows</p>
      ) : (
        <ul>
          {borrows.map(b => (
            <li key={b.isbn}>
              {b.borrower} borrowed book {b.isbn}
              <button onClick={() => handleReturn(b.isbn)}>Return</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
