import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const EmployeeProductivityReportForm = () => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const handleSubmit = async (e) => {
        try {
            const response = await fetch('admin/EmployeeProductivityReport', {
                method: 'POST',
                body: JSON.stringify({ month: selectedMonth, year: selectedYear }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                console.error('Error fetching employee productivity report:', response.statusText);
                return;
            }

            const data = await response.json();

            console.log('Employee Productivity Report Data:', data);

        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2>Employee Productivity Report</h2>
            <FormGroup>
                <Label for="month">Select Month:</Label>
                <Input
                    type="select"
                    name="month"
                    id="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    <option value="january">January</option>
                    <option value="february">February</option>
                    <option value="march">March</option>
                    <option value="april">April</option>
                    <option value="may">May</option>
                    <option value="june">June</option>
                    <option value="july">July</option>
                    <option value="august">August</option>
                    <option value="september">September</option>
                    <option value="october">October</option>
                    <option value="november">November</option>
                    <option value="december">December</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="year">Select Year:</Label>
                <Input
                    type="select"
                    name="year"
                    id="year"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                </Input>
            </FormGroup>
            <Button color="primary" type="submit">
                Generate Report
            </Button>
        </Form>
    );
};

export default EmployeeProductivityReportForm;
