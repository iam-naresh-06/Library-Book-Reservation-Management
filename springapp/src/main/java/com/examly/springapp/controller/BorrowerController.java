// src/main/java/com/examly/springapp/controller/BorrowerController.java
package com.examly.springapp.controller;

import com.examly.springapp.entity.Borrower;
import com.examly.springapp.service.BorrowerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/borrowers")
public class BorrowerController {

    @Autowired
    private BorrowerService borrowerService;

    @GetMapping
    public List<Borrower> getAllBorrowers(@RequestParam(required = false) String name) {
        return borrowerService.searchBorrowers(name);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Borrower> getBorrowerById(@PathVariable Long id) {
        return ResponseEntity.ok(borrowerService.getBorrowerById(id));
    }

    @PostMapping
    public ResponseEntity<Borrower> addBorrower(@RequestBody Borrower borrower) {
        return ResponseEntity.ok(borrowerService.addBorrower(borrower));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Borrower> updateBorrower(@PathVariable Long id, @RequestBody Borrower borrower) {
        return ResponseEntity.ok(borrowerService.updateBorrower(id, borrower));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBorrower(@PathVariable Long id) {
        borrowerService.deleteBorrower(id);
        return ResponseEntity.ok().build();
    }
}