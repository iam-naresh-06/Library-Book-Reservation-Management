package com.examly.springapp.controller;

import com.examly.springapp.entity.Book;
import com.examly.springapp.service.BookService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private BookService bookService;
    @Autowired
    public BookController(BookService bookService){
        this.bookService = bookService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        return ResponseEntity.ok(bookService.getBookById(id));
    }

    @PostMapping
    public ResponseEntity<Book> createBook(@Valid @RequestBody Book book) {
        return ResponseEntity.ok(bookService.addBook(book));
    }

    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    // @PutMapping("/{id}")
    // public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book bookDetails) {
    //     System.out.println("PUT /api/books/" + id + " called"); // Temporary debug
    //     return ResponseEntity.ok(bookService.updateBook(id, bookDetails));
    // }
    @PutMapping(value="/{id}",consumes="application/json",produces="application/json")
        public ResponseEntity<Book>updateBook(
            @PathVariable Long id,
            @Valid @RequestBody Book bookDetails){
                Book updatedBook = bookService.updateBook(id,bookDetails);
                return ResponseEntity.ok(updatedBook);
            }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
}