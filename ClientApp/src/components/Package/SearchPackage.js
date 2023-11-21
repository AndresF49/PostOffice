import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import ShowPackage from './ShowPackage';

const SearchPackage = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [resultPackage, setResultPackage] = useState(null);
	const [showNotFound, setShowNotFound] = useState(false);

	var packageNotFound = () => {
		return (
			<div>
				<p className='h5 text-center'>Package not found</p>
			</div>
		);
	}

	const handleSearch = async (e) => {
		e.preventDefault();
	try {
		const response = await fetch('package/SearchPackage', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ searchRequest: searchTerm }),
		});
		if (!response.ok) {
			setResultPackage(null);
			setShowNotFound(true);
			console.log("package not found")
		}
		else {
			const data = await response.json();
			// Handle the response data as needed
			setResultPackage(data);
			setShowNotFound(false);
			//console.log(resultPackage);
		}
	} catch (error) {
		console.error('Error searching:', error);
		}
	};

	return (
	<>
		<h2>Search for a Package</h2>
		<Form onSubmit={handleSearch}>
		<FormGroup>
			<Label for="searchInput">Tracking Id:</Label>
			<Input
			type="text"
			name="searchRequest"
			id="searchInput"
			placeholder="Enter your tracking Id"
			value={searchTerm}
			onChange={(e) => 
				{
					setSearchTerm(e.target.value);
					setShowNotFound(false);
				}}
			/>
		</FormGroup>
		<Button color="primary">
			Search
		</Button>
		</Form>
		<br></br>
		{resultPackage && <ShowPackage _package={resultPackage[0]} />}
		{showNotFound && packageNotFound()}

	</>
	);
};

export default SearchPackage;
