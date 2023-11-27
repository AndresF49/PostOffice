import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { PackageStatus } from './StatusEnums';

export default function ShowPackage({ _package }) {

	return (
		<>
			<Container >
				<Row>
					<Col>
						<b>Tracking Id:</b> {_package.TrackingNumber != null ? _package.TrackingNumber : "N/A"}
					</Col> 
					<Col>
						<b>Status:</b> {PackageStatus[_package.StatusId]}
					</Col> 
				</Row>
				<br></br>
				<Row>
					<Col><b>Sender:</b> {_package.Sender}</Col> <Col><b>Receiver:</b> {_package.Receiver}</Col>
				</Row>
				<Row>
					<Col><b>Source Address:</b> {_package.SourceAddress}</Col> <Col><b>Destination Address:</b> {_package.DestinationAddress}</Col>
				</Row>
				<br></br>
				<Row>
					<Col><b>Price:</b> ${_package.Price}</Col> <Col><b>Description of item:</b> {_package.DescriptionOfItem  != null ? _package.DescriptionOfItem : "N/A"}</Col>
				</Row>
				<Row>
					<Col><b>Declared Value:</b> {_package.DeclaredValue != null ? '$' + _package.DeclaredValue : "N/A"}</Col> <Col><b>Package Type:</b> {_package.PackageTypeId == 1 ? "Package" : "Envelope"}</Col>
				</Row>
				<Row>
					<Col><b>Weight:</b> {_package.Weight != null ? _package.Weight + ' lbs' : "N/A"}</Col> <Col><b>Signature Required:</b> {_package.SignatureRequired ? "Yes" : "No"}</Col>
				</Row>
				<Row>
					<Col><b>Length:</b> {_package.Length != null ? _package.Length + '"' : ""}</Col> <Col><b>Insurance:</b> {_package.Insurance ? "Yes" : "No"}</Col>
				</Row>
				<Row>
					<Col><b>Width:</b> {_package.Width != null ? _package.Width + '"' : ""}</Col>
				</Row>
				<Row>
					<Col><b>Depth:</b> {_package.Depth != null ? _package.Depth + '"' : ""}</Col>
				</Row>
			</Container>
		</>
	);
};