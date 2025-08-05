// src/main/java/com/examly/springapp/entity/BorrowRecord.java
package com.examly.springapp.entity;

import java.time.LocalDate;

@Entity
public class BorrowRecord {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    private Book book;
    
    @ManyToOne
    private Borrower borrower;
    
    private LocalDate borrowDate = LocalDate.now();
    private LocalDate dueDate;
    private LocalDate returnDate;
    private String status = "ACTIVE"; // ACTIVE, RETURNED, OVERDUE, LOST
    
    // Constructors, Getters, and Setters
    public BorrowRecord() {}
    
    public BorrowRecord(Book book, Borrower borrower, LocalDate dueDate) {
        this.book = book;
        this.borrower = borrower;
        this.dueDate = dueDate;
    }
    
    // Getters and Setters for all fields
}