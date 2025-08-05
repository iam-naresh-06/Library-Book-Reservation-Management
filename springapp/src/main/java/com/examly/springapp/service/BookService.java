// src/main/java/com/examly/springapp/service/BookService.java
package com.examly.springapp.service;

import com.examly.springapp.entity.Book;
import com.examly.springapp.exception.BusinessValidationException;
import com.examly.springapp.exception.ResourceNotFoundException;
import com.examly.springapp.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    // Test Case: Should return all books (BookServiceTest.testGetAllBooks)
    public List<Book> getAllBooks() {
        return bookRepository.findAll(); 
    }

    // Test Case: Should throw ResourceNotFoundException when book not found (BookServiceTest.testGetBookByIdNotFound)
    public Book getBookById(Long id) {
        return bookRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));
    }

    // Test Case: Should save book with valid fields (BookValidationTest)
    public Book addBook(Book book) {
        if(book.getTitle() == null || ((Object) book.getTitle()).trim().isEmpty()) {
            throw new BusinessValidationException("Title cannot be empty");
        }
        return bookRepository.save(book);
    }
}