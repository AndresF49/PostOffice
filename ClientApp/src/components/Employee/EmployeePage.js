import React from 'react';
import SearchPackage from '../Package/SearchPackage';
import CreatePackage from '../Package/CreatePackage';

export default function EmployeePage() {
	return (
		<div>
			<h1>Employee Package Lookup</h1>
			<SearchPackage />
			<CreatePackage />
		</div>
	);
}