import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useLocation } from 'react-router-dom';



export default function ShowPackage({ _package }) {

	return (
		<>
			<Container >
				<Row>
					<Col>
						<b>Tracking Id:</b> {_package.trackingNumber != null ? _package.trackingNumber : "N/A"}
					</Col> 
					<Col>
						<b>Status:</b> {_package.status}
					</Col> 
				</Row>
				<br></br>
				<Row>
					<Col><b>Sender:</b> {_package.sender}</Col> <Col><b>Receiver:</b> {_package.receiver}</Col>
				</Row>
				<Row>
					<Col><b>Source Address:</b> {_package.sourceAddress}</Col> <Col><b>Destination Address:</b> {_package.destinationAddress}</Col>
				</Row>
				<br></br>
				<Row>
					<Col><b>Price:</b> ${_package.price}</Col> <Col><b>Description of item:</b> {_package.descriptionOfItem  != null ? _package.descriptionOfItem : "N/A"}</Col>
				</Row>
				<Row>
					<Col><b>Declared Value:</b> {_package.declaredValue != null ? '$' + _package.declaredValue : "N/A"}</Col> <Col><b>Package Type:</b> {_package.packageType}</Col>
				</Row>
				<Row>
					<Col><b>Weight:</b> {_package.weight != null ? _package.weight + ' lbs' : "N/A"}</Col> <Col><b>Signature Required:</b> {_package.signatureRequired ? "Yes" : "No"}</Col>
				</Row>
				<Row>
					<Col><b>Length:</b> {_package.length != null ? _package.length + '"' : ""}</Col> <Col><b>Insurance:</b> {_package.insurance ? "Yes" : "No"}</Col>
				</Row>
				<Row>
					<Col><b>Width:</b> {_package.width != null ? _package.width + '"' : ""}</Col>
				</Row>
				<Row>
					<Col><b>Depth:</b> {_package.depth != null ? _package.depth + '"' : ""}</Col>
				</Row>
			</Container>
		</>
	);
};