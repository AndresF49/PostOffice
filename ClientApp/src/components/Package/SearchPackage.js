// import React, { Component } from 'react';

// export class SearchPackage extends Component {
//   // IMPORTANT - this will be a placeholder, most likely will be used when searching/display ALL packages
//   // which will not be possible by customers/employees
//   static displayName = SearchPackage.name;

//   constructor(props) {
//     super(props);
//     this.state = { Packages: [], loading: true };
//   }

//   componentDidMount() {
//     this.populatePackageList();
//   }

//   static renderListTable(PackageList) {
// 	console.log(PackageList);
//     return (
//       <table className="table table-striped" aria-labelledby="tableLabel">
//         <thead>
//           <tr>
//             <th>Status</th>
//             <th>Sender</th>
//             <th>Source Address</th>
//             <th>Reciever</th>
//             <th>Destination Address</th>
//             <th>Price</th>
//             <th>Description of Item</th>
//             <th>Declared Value</th>
//             <th>Package Type</th>
//             <th>Weight</th>
//             <th>Length</th>
//             <th>Width</th>
//             <th>Depth</th>
//             <th>Signature Required</th>
//             <th>Insurance</th>
//           </tr>
//         </thead>
//         <tbody>
//           {PackageList.map(item =>
//             <tr key={item.packageId}>
//               <td>{item.status}</td>
//               <td>{item.sender}</td>
//               <td>{item.sourceAddress}</td>
//               <td>{item.receiver}</td>
//               <td>{item.destinationAddress}</td>
//               <td>{item.price}</td>
//               <td>{item.descriptionOfItem}</td>
//               <td>{item.declaredValue}</td>
//               <td>{item.packageType}</td>
//               <td>{item.weight}</td>
//               <td>{item.length}</td>
//               <td>{item.width}</td>
//               <td>{item.depth}</td>
//               <td>{item.signatureRequired.toString()}</td>
//               <td>{item.insurance.toString()}</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     );
//   }

//   render() {
//     let contents = this.state.loading
//       ? <p><em>Loading...</em></p>
//       : SearchPackage.renderListTable(this.state.Packages);

//     return (
//       <div>
//         <h1 id="tableLabel">Package</h1>
//         <p>This component demonstrates fetching data from the server.</p>
//         {contents}
//       </div>
//     );
//   }

//   async populatePackageList() {
//     const response = await fetch('package');
//     const data = await response.json();
//     this.setState({ Packages: data, loading: false });
//   }
// }

import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import ShowPackage from './ShowPackage';

const SearchPackage = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [resultPackage, setResultPackage] = useState(null);

	const handleSearch = async () => {
	try {
		const response = await fetch('package/SearchPackage', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ searchRequest: searchTerm }),
		});

		const data = await response.json();
		// Handle the response data as needed
		setResultPackage(data);
		// console.log(data);
	} catch (error) {
		console.error('Error searching:', error);
	}
	};

	return (
	<>
		<h2>Search for an Object</h2>
		<Form>
		<FormGroup>
			<Label for="searchInput">Tracking Id:</Label>
			<Input
			type="text"
			name="searchRequest"
			id="searchInput"
			placeholder="Enter your tracking Id"
			value={searchTerm}
			onChange={(e) => setSearchTerm(e.target.value)}
			/>
		</FormGroup>
		<Button color="primary" onClick={handleSearch}>
			Search
		</Button>
		</Form>
		{resultPackage && <ShowPackage _package={resultPackage} />}
	</>
	);
};

export default SearchPackage;
