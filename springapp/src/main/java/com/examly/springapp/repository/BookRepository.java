package com.examly.springapp.repository;

import com.examly.springapp.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    // Add this for the test case
    @Override
    <S extends Book> S save(S entity);
    
    // Keep all existing methods
    Optional<Book> findById(Long id);
    Optional<Book> findByIsbn(String isbn);
    boolean existsByIsbn(String isbn);
    List<Book> findByTitle(String title);
    List<Book> findByAuthor(String author);
    List<Book> findByAvailable(Boolean available);
    List<Book> findAll();
    
    default Book findByIdOrThrow(Long id) {
        return findById(id).orElseThrow();
    }
}