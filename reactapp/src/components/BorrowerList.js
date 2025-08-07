import React from 'react';

const BorrowerList = ({ borrowers, onSelect }) => {
  return (
    <div>
      <h3>Borrowers</h3>
      {borrowers.length === 0 ? (
        <p>No borrowers found</p>
      ) : (
        <ul>
          {borrowers.map(borrower => (
            <li key={borrower.id}>
              {borrower.name} ({borrower.email})
              <button onClick={() => onSelect(borrower.id)}>View Borrows</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BorrowerList;