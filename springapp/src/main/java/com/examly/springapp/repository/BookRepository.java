// src/main/java/com/examly/springapp/repository/BookRepository.java
package com.examly.springapp.repository;

import com.examly.springapp.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByTitleContainingIgnoreCase(String title);
    List<Book> findByAuthorContainingIgnoreCase(String author);
    List<Book> findByAvailable(Boolean available);
    Book findByIsbn(Object isbn);
}