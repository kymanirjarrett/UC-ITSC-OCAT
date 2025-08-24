import React, { useEffect, useState } from 'react';
import { AssessmentService } from '../../services/AssessmentService';
import { useTable } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Pagination, Table } from 'react-bootstrap';
import './Assessment.css';

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);
  const [ sorting, setSorting ] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js
  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const data = await AssessmentService.getList();
        setAssessments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching assessments:', error);
        setAssessments([]);
      }
    };
    fetchAssessments();
  }, []);

  // React table setup
  const columns = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: "Cat's Name", accessor: 'catName' },
      { Header: 'Date of Birth', 
        accessor: 'catDateOfBirth',
        cell: ({getValue}) => {
          const date = getValue();
          return date ? newDate(date).toISOString().split('T')[0] : '';
        }},
      { Header: 'Assessment Score', accessor: 'score' },
      { Header: 'Risk Level', accessor: 'riskLevel' },
    ],
    []
  );

  const assessmentTable = useTable({ columns, data: assessments });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = assessmentTable;

  // Pagination logic
  const totalPages = Math.ceil(assessments.length / pageSize);
  const paginatedAssessments = assessments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (

    <div className="mt-4">

      <h2 className="mb-3" style={{ fontWeight: 'bold' }}>Assessment List</h2>

      <Table className='assessmentTable' striped bordered hover responsive style={{ border: 'solid 1px black' }}>

        <thead style={{ textAlign: 'center' }}>
          <tr>
            <th>ID</th>
            <th>Cat's Name</th>
            <th>Date of Birth</th>
            <th>Assessment Score</th>
            <th>Risk Level</th>
          </tr>
        </thead>

        <tbody>
          {assessments.map(assessment => (
            <tr key={assessment.id}>
              <td style={{ textAlign: 'right' }}>{assessment.id}</td>
              <td style={{ textAlign: 'center' }}>{assessment.catName}</td>
              <td style={{ textAlign: 'right' }}>
                {assessment.catDateOfBirth
                  ? new Date(assessment.catDateOfBirth).toISOString().split('T')[0]
                  : ''}
              </td>
              <td style={{ textAlign: 'right' }}>{assessment.score}</td>
              <td style={{ textAlign: 'center' }}>
                {assessment.riskLevel ? assessment.riskLevel.charAt(0).toUpperCase() + assessment.riskLevel.slice(1) : ''}
              </td>
            </tr>
          ))}
        </tbody>

      </Table>

      {/* Pagination Controls */}
      <Pagination className=" pagination mt-4">
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        {[...Array(totalPages)].map((_, idx) => (
          <Pagination.Item
            key={idx + 1}
            active={currentPage === idx + 1}
            onClick={() => handlePageChange(idx + 1)}
          >
            {idx + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>

    </div>

  );
  
};