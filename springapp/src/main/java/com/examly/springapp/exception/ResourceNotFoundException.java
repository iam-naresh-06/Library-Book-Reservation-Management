// src/main/java/com/examly/springapp/exception/ResourceNotFoundException.java
package com.examly.springapp.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}