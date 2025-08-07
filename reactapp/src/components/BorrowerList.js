import React from 'react';

const BorrowerList = ({ borrowers, onSelect }) => {
  return (
    <div data-testid="borrower-list">
      {borrowers.length === 0 ? (
        <p data-testid="empty-message">No borrowers found</p>
      ) : (
        <ul data-testid="borrowers-container">
          {borrowers.map(borrower => (
            <li key={borrower.id} data-testid={`borrower-item-${borrower.id}`}>
              <div className="borrower-info">
                <span data-testid="borrower-name">{borrower.name}</span>
                <span data-testid="borrower-email"> ({borrower.email})</span>
              </div>
              <button
                onClick={() => onSelect(borrower.id)}
                data-testid={`view-btn-${borrower.id}`}
              >
                View Borrows
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BorrowerList;