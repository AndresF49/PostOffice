import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import PostOfficeRevenueForm from './ReportForms/PostOfficeRevenueForm';
import AnnualRevenueReportForm from './ReportForms/AnnualRevenueReportForm';
import EmployeeProductivityReportForm from './ReportForms/EmployeeProductivityReportForm';


const AdminPage = () => {
    // State to track which report form should be displayed
    const [selectedReport, setSelectedReport] = useState(null);
    const handleReportButtonClick = (report) => {
      setSelectedReport(selectedReport === report ? null : report);
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <Row>
                <Col>
                    <Button color="primary" onClick={() => handleReportButtonClick('PostOfficeRevenue')}>
                        Post Office Revenue Report
                    </Button>
                </Col>
                <Col>
                    <Button color="primary" onClick={() => handleReportButtonClick('AnnualRevenueReport')}>
                        Annual Revenue Report
                    </Button>
                </Col>
                <Col>
                    <Button color="primary" onClick={() => handleReportButtonClick('EmployeeProductivityReport')}>
                        Employee Productivity Report
                    </Button>
                </Col>            </Row>

            {selectedReport === 'PostOfficeRevenue' && <PostOfficeRevenueForm />}
            {selectedReport === 'AnnualRevenueReport' && <AnnualRevenueReportForm />}
            {selectedReport === 'EmployeeProductivityReport' && <EmployeeProductivityReportForm />}
        </div>
    );
};

export default AdminPage;