import React, { useEffect, useState } from 'react';
import { AssessmentService } from '../../services/AssessmentService';
import { useTable } from 'react-table';

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);

  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js
  useEffect(() => {
    const fetchAssessments = async () => {
      setAssessments(await AssessmentService.getList());
    };
    fetchAssessments();
  }, []);

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

  return (
    <div>
      <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: 'solid 3px red',
                    background: 'aliceblue',
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      border: 'solid 1px gray',
                      background: 'papayawhip',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};