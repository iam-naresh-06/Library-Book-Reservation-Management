// src/components/SearchBooks.js
import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const BookSearch = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    title: '',
    author: '',
    isbn: '',
    available: 'all'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  const handleReset = () => {
    setSearchParams({
      title: '',
      author: '',
      isbn: '',
      available: 'all'
    });
    onSearch({});
  };
  return (
    <Form onSubmit={handleSubmit} className="mb-4 p-3 bg-light rounded">
      <Row>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={searchParams.title}
              onChange={handleChange}
              placeholder="Search by title"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              name="author"
              value={searchParams.author}
              onChange={handleChange}
              placeholder="Search by author"
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group>
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              type="text"
              name="isbn"
              value={searchParams.isbn}
              onChange={handleChange}
              placeholder="Search by ISBN"
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group>
            <Form.Label>Availability</Form.Label>
            <Form.Select
              name="available"
              value={searchParams.available}
              onChange={handleChange}
            >
              <option value="all">All</option>
              <option value="available">Available</option>
              <option value="borrowed">Borrowed</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={2} className="d-flex align-items-end">
          <Button variant="primary" type="submit" className="me-2">
            Search
          </Button>
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
export default BookSearch;