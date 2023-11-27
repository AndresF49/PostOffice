import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import EmployeeProductivityReportForm from '../ReportForms/EmployeeProductivityReportForm';
import PostOfficeRevenueReportForm from '../ReportForms/PostOfficeRevenueReportForm';
import WorkforceOptimizationReportForm from '../ReportForms/WorkforceOptimizationReportForm';

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
                    <Button color="primary" onClick={() => handleReportButtonClick('PostOfficeRevenueReport')}>
                        Post Office Revenue Report
                    </Button>
                </Col>
                <Col>
                    <Button color="primary" onClick={() => handleReportButtonClick('WorkforceOptimizationReport')}>
                        Workforce Optimization Report
                    </Button>
                </Col>
                <Col>
                    <Button color="primary" onClick={() => handleReportButtonClick('EmployeeProductivityReport')}>
                        Employee Productivity Report
                    </Button>
                </Col>           
             </Row>
            <br></br>
            {selectedReport === 'PostOfficeRevenueReport' && <PostOfficeRevenueReportForm />}
            {selectedReport === 'WorkforceOptimizationReport' && <WorkforceOptimizationReportForm />}
            {selectedReport === 'EmployeeProductivityReport' && <EmployeeProductivityReportForm />}
        </div>
    );
};

export default AdminPage;