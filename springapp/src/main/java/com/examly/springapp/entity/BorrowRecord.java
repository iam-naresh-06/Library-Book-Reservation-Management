// src/main/java/com/examly/springapp/entity/BorrowRecord.java
package com.examly.springapp.entity;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class BorrowRecord {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;
    
    @ManyToOne
    @JoinColumn(name = "borrower_id", nullable = false)
    private Borrower borrower;
    
    private LocalDate borrowDate = LocalDate.now();
    private LocalDate dueDate;
    private LocalDate returnDate;
    private String status = "ACTIVE"; // ACTIVE, RETURNED, OVERDUE, LOST
    
    // Constructors
    public BorrowRecord() {}
    
    public BorrowRecord(Book book, Borrower borrower, LocalDate dueDate) {
        this.book = book;
        this.borrower = borrower;
        this.dueDate = dueDate;
    }
    
    // Getters and Setters
    // ... (implement all getters and setters)
}