import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Table, Col } from 'reactstrap';

const PostOfficeRevenueReportForm = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState(null);
    const [reportData, setReportData] = useState(null);
    var key = 0;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/admin/AnnualReport', { //need the correct URL
                method: 'POST',
                body: JSON.stringify({ 
                    StartDate: startDate,
                    EndDate: endDate
                }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                console.error('Error fetching Post office revenue report:', response.statusText);
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
          <Form onSubmit={handleSubmit}>
              <h2>Post Office Revenue Report</h2>
              <FormGroup>
                  <Label for="startDate">Select Start Date:</Label>
                  <Input
                      type="date"
                      name="startDate"
                      id="startDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                  >
                  </Input>
              </FormGroup>
              <FormGroup>
                  <Label for="endDate">Select End Date:</Label>
                  <Input
                      type="date"
                      name="endDate"
                      id="endDate"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                  >
                  </Input>
              </FormGroup>
              <Button color="success" type="submit">
                  Generate Report
              </Button>
          </Form>

          {reportData && 
          <>
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                <tr>
                  <th>PostOfficeId</th>
                  {/* <th>PostMasterId</th>
                  <th>PostMaster Name</th> */}
                  <th>Total Revenue</th>                  
                </tr>
                </thead>
                <tbody>
                {reportData.map(item =>
                  <tr key={key+=1}>
                    <td>{item.postOfficeId}</td>
                    {/* <td>{item.postMasterId}</td>
                    <td>{item.postMasterName}</td> */}
                    <td>${item.totalRevenue}</td>
                  </tr>
                )}
                </tbody>
              </table>
          </>
          }
        </>
    );
};

export default PostOfficeRevenueReportForm;