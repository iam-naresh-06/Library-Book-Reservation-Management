// src/main/java/com/examly/springapp/service/BorrowService.java

package com.examly.springapp.service;

import com.examly.springapp.entity.Book;
import com.examly.springapp.entity.BorrowRecord;
import com.examly.springapp.exception.BusinessValidationException;
import com.examly.springapp.exception.ResourceNotFoundException;
import com.examly.springapp.repository.BookRepository;
import com.examly.springapp.repository.BorrowRecordRepository;
import com.examly.springapp.repository.BorrowerRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@Service
public class BorrowService {

    private final BookRepository bookRepository;
    private final BorrowerRepository borrowerRepository;
    private final BorrowRecordRepository borrowRecordRepository;

    public BorrowService(BookRepository bookRepository, 
                        BorrowerRepository borrowerRepository, 
                        BorrowRecordRepository borrowRecordRepository) {
        this.bookRepository = bookRepository;
        this.borrowerRepository = borrowerRepository;
        this.borrowRecordRepository = borrowRecordRepository;
    }

    public BorrowRecord borrowBook(Long bookId, Long borrowerId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found"));
        
        if (!book.getAvailable()) {
            throw new BusinessValidationException("Book is not available for borrowing");
        }

        Borrower borrower = borrowerRepository.findById(borrowerId)
                .orElseThrow(() -> new ResourceNotFoundException("Borrower not found"));

        book.setAvailable(false);
        bookRepository.save(book);

        BorrowRecord borrowRecord = new BorrowRecord();
        borrowRecord.setBook(book);
        borrowRecord.setBorrower(borrower);
        borrowRecord.setBorrowDate(LocalDate.now());

        return borrowRecordRepository.save(borrowRecord);
    }

    public BorrowRecord returnBook(Long borrowRecordId) {
        BorrowRecord borrowRecord = borrowRecordRepository.findById(borrowRecordId)
                .orElseThrow(() -> new ResourceNotFoundException("Borrow record not found"));

        if (borrowRecord.getReturnDate() != null) {
            throw new BusinessValidationException("Book already returned");
        }

        Book book = borrowRecord.getBook();
        book.setAvailable(true);
        bookRepository.save(book);

        borrowRecord.setReturnDate(LocalDate.now());
        return borrowRecordRepository.save(borrowRecord);
    }

    public List<BorrowRecord> getActiveBorrowRecords() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getActiveBorrowRecords'");
    }

    public List<BorrowRecord> getBorrowRecordsByBorrower(Long borrowerId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getBorrowRecordsByBorrower'");
    }
}