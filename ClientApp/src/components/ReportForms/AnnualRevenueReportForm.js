import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const AnnualRevenueReportForm = () => {
    const [selectedYear, setSelectedYear] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/reports/annual-revenue', { //need the correct URL
                method: 'POST',
                body: JSON.stringify({ year: selectedYear }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                console.error('Error fetching annual revenue report:', response.statusText);
                return;
            }

            const data = await response.json();

            console.log('Annual Revenue Report Data:', data);

        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2>Annual Revenue Report</h2>
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
            <Button color="success" type="submit">
                Generate Report
            </Button>
        </Form>
    );
};

export default AnnualRevenueReportForm;