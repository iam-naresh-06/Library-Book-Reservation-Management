// src/main/java/com/examly/springapp/service/BorrowService.java
package com.examly.springapp.service;

import com.examly.springapp.entity.Book;
import com.examly.springapp.entity.BorrowRecord;
import com.examly.springapp.entity.Borrower;
import com.examly.springapp.exception.BusinessValidationException;
import com.examly.springapp.exception.ResourceNotFoundException;
import com.examly.springapp.repository.BookRepository;
import com.examly.springapp.repository.BorrowRecordRepository;
import com.examly.springapp.repository.BorrowerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class BorrowService {

    @Autowired
    private BorrowRecordRepository borrowRecordRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BorrowerRepository borrowerRepository;

    public BorrowRecord borrowBook(Long bookId, Long borrowerId, LocalDate dueDate) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found"));
        
        if (!book.getAvailable()) {
            throw new BusinessValidationException("Book is not available for borrowing");
        }

        Borrower borrower = borrowerRepository.findById(borrowerId)
                .orElseThrow(() -> new ResourceNotFoundException("Borrower not found"));

        BorrowRecord record = new BorrowRecord(book, borrower, dueDate);
        book.setAvailable(false);
        bookRepository.save(book);

        return borrowRecordRepository.save(record);
    }

    public BorrowRecord returnBook(Long recordId) {
        BorrowRecord record = borrowRecordRepository.findById(recordId)
                .orElseThrow(() -> new ResourceNotFoundException("Borrow record not found"));

        Book book = record.getBook();
        book.setAvailable(true);
        bookRepository.save(book);

        record.setReturnDate(LocalDate.now());
        record.setStatus("RETURNED");
        return borrowRecordRepository.save(record);
    }

    public List<BorrowRecord> getActiveBorrowRecords() {
        return borrowRecordRepository.findByStatus("ACTIVE");
    }

    public List<BorrowRecord> getBorrowRecordsByBorrower(Long borrowerId) {
        return borrowRecordRepository.findByBorrowerId(borrowerId);
    }
}