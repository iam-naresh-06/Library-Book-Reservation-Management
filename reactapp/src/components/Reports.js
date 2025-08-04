// src/components/Reports.js
import React, { useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import api from '../utils/api';
import { CSVLink } from 'react-csv';

const Reports = () => {
  const [reportType, setReportType] = useState('overdue');
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  const generateReport = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/reports/${reportType}`, {
        params: dateRange
      });
      setReportData(response.data);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setLoading(false);
    }
  };

  const headers = {
    overdue: [
      { label: 'Borrow ID', key: 'id' },
      { label: 'Book Title', key: 'book.title' },
      { label: 'Borrower', key: 'borrower.name' },
      { label: 'Due Date', key: 'dueDate' },
      { label: 'Days Overdue', key: 'daysOverdue' },
      { label: 'Fine Amount', key: 'fineAmount' }
    ],
    borrowing: [
      { label: 'Borrow ID', key: 'id' },
      { label: 'Book', key: 'book.title' },
      { label: 'Borrower', key: 'borrower.name' },
      { label: 'Borrow Date', key: 'borrowDate' },
      { label: 'Due Date', key: 'dueDate' },
      { label: 'Status', key: 'status' }
    ]
  };
return (
    <div>
      <h2>Generate Reports</h2>
      <div className="mb-4 p-3 bg-light rounded">
        <Form.Group className="mb-3">
          <Form.Label>Report Type</Form.Label>
          <Form.Select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="overdue">Overdue Books</option>
            <option value="borrowing">Borrowing Activity</option>
            <option value="popular">Most Popular Books</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date Range</Form.Label>
          <div className="d-flex">
            <Form.Control
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              className="me-2"
            />
            <Form.Control
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
            />
          </div>
        </Form.Group>

        <Button onClick={generateReport} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Report'}
        </Button>
      </div>

      {reportData.length > 0 && (
        <>
          <div className="d-flex justify-content-end mb-3">
            <CSVLink
              data={reportData}
              headers={headers[reportType]}
              filename={`${reportType}_report.csv`}
              className="btn btn-success"
            >
              Export to CSV
            </CSVLink>
          </div>

          <Table striped bordered hover>
            <thead>
              <tr>
                {headers[reportType].map(header => (
                  <th key={header.key}>{header.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reportData.map(item => (
                <tr key={item.id}>
                  {headers[reportType].map(header => (
                    <td key={header.key}>
                      {header.key.split('.').reduce((o, i) => o[i], item)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default Reports;