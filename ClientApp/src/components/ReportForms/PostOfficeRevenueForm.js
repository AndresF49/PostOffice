import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const PostOfficeRevenueForm = () => {
    const [postOfficeId, setPostOfficeId] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedQuarter, setSelectedQuarter] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();

 
        fetch('/api/reports/post-office-revenue', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                postOfficeId,
                selectedMonth,
                selectedQuarter,
                selectedYear,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Revenue Report:', data);
            })
            .catch((error) => {
                console.error('Error fetching revenue report:', error);
            });
    };

    return (
        <div>
            <h2>Post Office Revenue Report</h2>
            <Form onSubmit={handleFormSubmit}>
                <FormGroup>
                    <Label for="postOfficeId">Post Office</Label>
                    <Input
                        type="text"
                        name="postOfficeId"
                        id="postOfficeId"
                        value={postOfficeId}
                        onChange={(e) => setPostOfficeId(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="selectedMonth">Month</Label>
                    <Input
                        type="text"
                        name="selectedMonth"
                        id="selectedMonth"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="selectedQuarter">Quarter</Label>
                    <Input
                        type="text"
                        name="selectedQuarter"
                        id="selectedQuarter"
                        value={selectedQuarter}
                        onChange={(e) => setSelectedQuarter(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="selectedYear">Year</Label>
                    <Input
                        type="text"
                        name="selectedYear"
                        id="selectedYear"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    />
                </FormGroup>
                <Button color="primary" type="submit">
                    Generate Report
                </Button>
            </Form>
        </div>
    );
};

export default PostOfficeRevenueForm;