import { Row, Col } from 'reactstrap';
import CreatePackage from './Package/CreatePackage';

export default function Home({ authentication }) {

	return (
		<div>
      <h1>User details:</h1>
      <Row>
        <Col>
          UserId: {authentication.currentUser.UserId}
        </Col>
        <Col>
          Role: {authentication.role}
        </Col>
        <Col>
          Username: {authentication.currentUser.Username}
        </Col>
        <Col>
          CustomerId: {authentication.currentUser.CustomerId ? authentication.currentUser.CustomerId : "Not a customer"}
        </Col>
        <Col>
          EmployeeId: {authentication.currentUser.EmployeeId ? authentication.currentUser.EmployeeId : "Not an employee"}
        </Col>
      </Row>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
			<CreatePackage />
		</div>
	);
}
