package com.examly.springapp.service;

import com.examly.springapp.entity.Book;
import com.examly.springapp.exception.BusinessValidationException;
import com.examly.springapp.exception.ResourceNotFoundException;
import com.examly.springapp.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Book getBookById(long id) {
        return bookRepository.findById(id)
               .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));
    }

    public Book addBook(Book book) {
        // Validate title
        if (book.getTitle() == null || ((Object) book.getTitle()).trim().isEmpty()) {
            throw new BusinessValidationException("Title cannot be empty");
        }

        // Validate ISBN uniqueness
        if (bookRepository.findByIsbn(book.getIsbn()).isPresent()) {
            throw new BusinessValidationException("ISBN already exists");
        }

        return bookRepository.save(book);
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
}