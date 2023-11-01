import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Row, Col, CardText } from 'reactstrap';



export default function Packages() {
	const [listPackages, updatePackages] = useState([]);
	const [sendingPackages, updateSending] = useState([]);
	const [receivingPackages, updateReceiving] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('package');
				const data = await response.json();
				updatePackages(data);

				const sendingPackagesData = data.filter(pack => pack.sender === 'Andres');
				const receivingPackagesData = data.filter(pack => pack.receiver === 'Andres');

				updateSending(sendingPackagesData); // update useStates with new arrays because pushing could lead to unexpected behavior in react
				updateReceiving(receivingPackagesData);

				console.log(data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
	}, []); // Empty dependency array ensures useEffect runs once after initial render


	// return data feature conditional rendering such as checking the length of each array, if empty then do not render, else render it
	// probably change the way this data gets displayed so that we can show multiple packages, so... dont use card?
	return (
		<>
			<h1>Packages linked to Account</h1>
			<Row>
				<Col>
				<Card>
					<CardHeader>Sending</CardHeader>
					{sendingPackages.length > 0 && (
						<CardBody>
							<b>Tracking Id:</b> {sendingPackages[0].trackingNumber === null ? "N/A" : sendingPackages[0].trackingNumber}
							<b>Receiver:</b> {sendingPackages[0].receiver}
							<b>Package Type:</b> {sendingPackages[0].packageType}
						</CardBody>
					)}
				</Card>
				</Col>
				<Col>
					<Card>
						<CardHeader>Receiving</CardHeader>
						{
							receivingPackages.length > 0 && (
								<CardBody>
									<CardText>
										<p><b>Tracking Id:</b> {receivingPackages[0].trackingNumber === null ? "N/A" : receivingPackages[0].trackingNumber}</p>
										<p><b>Sender:</b> {receivingPackages[0].sender}</p>
										<p><b>Package Type:</b> {receivingPackages[0].packageType}</p>
									</CardText>
									
								</CardBody>
							)
						}
					</Card>
				</Col>
			</Row>

		</>
	);
};
