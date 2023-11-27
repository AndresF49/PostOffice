import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Table, Col } from 'reactstrap';

const WorkforceOptimizationReportForm = () => {
    const [reportData, setReportData] = useState(null);
    var key = 0;

    const handleSubmit = async (e) => {
        try {
            const response = await fetch('/admin/WorkforceOptimizationReport');

            if (!response.ok) {
                console.error('Error fetching Workforce optimization report:', response.statusText);
                return;
            }

            const data = await response.json();
            setReportData(data);

            console.log('Post office revenue Report Data:', data);

        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };

    return (
        <>
        <Button className='btn-success' onClick={handleSubmit}>Get Report</Button>
          {reportData && 
          <>
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                <tr>
                  <th>PostOfficeId</th>
                  <th>Package Count</th>
                  <th>Employee Count</th>
                </tr>
                </thead>
                <tbody>
                {reportData.map(item =>
                  <tr key={key+=1}>
                    <td>{item.postOfficeId}</td>
                    <td>{item.packageCount}</td>
                    <td>{item.employeeCount}</td>
                  </tr>
                )}
                </tbody>
              </table>
          </>
          }
        </>
    );
};

export default WorkforceOptimizationReportForm;