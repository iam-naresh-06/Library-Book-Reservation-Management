package com.examly.springapp.controller;

import com.examly.springapp.entity.Borrower;
import com.examly.springapp.exception.ResourceNotFoundException;
import com.examly.springapp.repository.BorrowerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BorrowerService {

    private final BorrowerRepository borrowerRepository;

    @Autowired
    public BorrowerService(BorrowerRepository borrowerRepository) {
        this.borrowerRepository = borrowerRepository;
    }

    public List<Borrower> getAllBorrowers() {
        return borrowerRepository.findAll();
    }

    public Borrower getBorrowerById(Long id) {
        return borrowerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Borrower not found with id: " + id));
    }

    public Borrower addBorrower(Borrower borrower) {
        // You might want to add validation for email uniqueness here
        return borrowerRepository.save(borrower);
    }

    public Borrower updateBorrower(Long id, Borrower borrowerDetails) {
        Borrower borrower = borrowerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Borrower not found with id: " + id));

        borrower.setName(borrowerDetails.getName());
        borrower.setEmail(borrowerDetails.getEmail());
        borrower.setPhone(borrowerDetails.getPhone());
        // Don't update membershipDate as it should remain the original date

        return borrowerRepository.save(borrower);
    }

    public void deleteBorrower(Long id) {
        Borrower borrower = borrowerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Borrower not found with id: " + id));
        
        // You might want to check if the borrower has any active borrow records before deleting
        borrowerRepository.delete(borrower);
    }
}