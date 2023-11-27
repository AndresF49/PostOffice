import { Container, Row, Col, Button, Form, Label, FormGroup, Card, CardBody } from "reactstrap";
import { useForm } from 'react-hook-form'
import { useState } from 'react';
import { Roles } from "../Account/Roles";
import SearchCustomer from "../Customer/SearchCustomer";

export default function CreatePackage({ authentication }) {
	const { register, handleSubmit, formState, reset } = useForm();
	const { errors } = formState
	const [showTrackingNumber, setShowTrackingNumber] = useState(null);
	const [customerSelected, setCustomerSelected] = useState(null);

	const EmployeeCreatePackage = async (packageData) => {
		// we may have to give employee Id too to store with Transaction
		try {
			const response = await fetch('package/EmployeeCreatePackage', {
				method: 'POST',
				headers: {
				'Content-Type': 'application/json'
				},
				body: JSON.stringify({ 
					request: {
						UserId: authentication.currentUser.UserId,
					Receiver: packageData.Receiver,
					SenderId: packageData.SenderId,
					DescriptionOfItem: packageData.DescriptionOfItem,
					PackageTypeId: packageData.PackageTypeId,
					Weight: packageData.Weight,
					Length: packageData.Length,
					Width: packageData.Width,
					Depth: packageData.Depth,
					SignatureRequired: packageData.SignatureRequired,
					Insurance: packageData.Insurance,
					SourceAddress: packageData.SourceAddress,
					DestinationAddress: packageData.DestinationAddress,
					StatusId: packageData.StatusId,
					}
					
				}) 
			}); 
	
			if (!response.ok) {
				if (response.status === 400) {
					const errorData = await response.json();
					console.log("Error 400 recieved");
					console.log(errorData.error);
					return;
				} else {
					console.error('Error during Package Creation:', response.statusText);
					return ;
				}
			} else {
				// Handle successful package creation if needed
				const result = response.json();
				console.log('Package creation successful');
				return result.TrackingNumber;
			}
		} catch (error) {
			console.log("Error when creating Package: ", error);
			return;
		}
	}

	const CreatePackage = async (packageData) => {
		try {
			const response = await fetch('package/CreatePackage', {
				method: 'POST',
				headers: {
				'Content-Type': 'application/json'
				},
				body: JSON.stringify({ 
					Package: packageData
				}) 
			}); 
	
			if (!response.ok) {
				if (response.status === 400) {
					const errorData = await response.json();
					console.log("Error 400 recieved");
					console.log(errorData.error);
					return false;
				} else {
					console.error('Error during Package Creation:', response.statusText);
					return false;
				}
			} else {
				// Handle successful package creation if needed
				const result = response.json();
				console.log('Package creation successful');
				return result.TrackingNumber;
			}
		} catch (error) {
			console.log("Error when creating Package: ", error);
			return false;
		}
	}

	const onSubmit = (packageData) => {
		reset();

		// combine all addresses to store in SourceAddress and DestinationAddress 
		// SourceAddress = senderHouseAndStreet + senderCity + senderZipcode + senderState
		// DestinationAddress = receiverHouseAndStreet + receiverCity + receiverZipcode + receiverState

		packageData.SourceAddress = `${packageData.senderHouseAndStreet} ${packageData.senderCity}, ${packageData.senderState}. ${packageData.senderZipcode}`;
		packageData.DestinationAddress = `${packageData.receiverHouseAndStreet} ${packageData.receiverCity}, ${packageData.receiverState}. ${packageData.receiverZipcode}`;
		

		// setShowTrackingNumber("ABC123");
		if (authentication.role === Roles[1] || authentication.role === Roles[2]) {
			// console.log(`${packageData.Receiver} - ${packageData.SourceAddress} -> ${packageData.DestinationAddress}`);
			packageData.SenderId = customerSelected.value.CustomerId;
			packageData.StatusId = 2;
			console.log(packageData);
			const trackingNumber = EmployeeCreatePackage(packageData);
			if (trackingNumber.result == null) {
				console.log("TrackingNumber was returned with False -> Failed for EmployeeCreatePackage");
			}
			else {
				setShowTrackingNumber(trackingNumber);
			}
			// send EmployeeCreatepackage
			// pass Customer and package in EmployeeCreatePackage
		} else if (authentication.role === Roles[3]) {
			// send CreatePackage with just a package
			packageData.SenderId = authentication.currentUser.UserId; // backend will search on UserId to grab customer
			const trackingNumber = CreatePackage(packageData);
			if (trackingNumber === false) {
				console.log("TrackingNumber was returned with False -> Failed for CreatePackage");
			}
			else {
				setShowTrackingNumber(trackingNumber);
			}
		}
		// setPackageInfo(data)
		// console.log(data);
	};

	return (
		<>
		{
		!showTrackingNumber ?
		<>
		<h5 className="text-center mb-5 fw-light fs-2">Create a Package</h5>
		<Form noValidate onSubmit={ handleSubmit(onSubmit) }  className="border border-2 p-3 rounded clearfix">
			{/* Sender */}
      <Row>
        <Label className="fw-bold">Source Address</Label>
      </Row>
			<Row>
				<Col md={5}>
					<FormGroup floating className="mb-3">
						<input 
							type="text" 
							className="form-control" 
							id="senderHouseAndStreet" 
							placeholder="123 Sesame St"
							{...register("senderHouseAndStreet", {  
								required: {
									value: true,
									message: 'House number and street is required'
								}
							})}
						/>
						<Label htmlFor="senderHouseAndStreet">
							House Number and Street Address<span className="text-danger">*</span>
						</Label>
						<p className="text-danger mt-1">{errors.senderHouseAndStreet?.message}</p>
					</FormGroup>
				</Col>
				<Col md={3}>
					<FormGroup floating className="mb-3">
						<input 
							type="text" 
							className="form-control" 
							id="senderCity" 
							placeholder="Houston"
							{...register("senderCity", {
								required: {
									value: true,
									message: 'City is required'
								}
							})}
						/>
						<Label htmlFor="senderCity">
							City<span className="text-danger">*</span>
						</Label>
						<p className="text-danger mt-1">{errors.senderCity?.message}</p>
					</FormGroup>
				</Col>
				<Col md={2}>
					<FormGroup floating className="mb-3">
						<input 
							type="text" 
							className="form-control" 
							id="senderZipcode" 
							placeholder="Zipcode"
							{...register("senderZipcode", {
								required: {
									value: true,
									message: 'Zipcode is required'
								}
							})}
						/>
						<Label htmlFor="senderZipcode">
							Zipcode<span className="text-danger">*</span>
						</Label>
						<p className="text-danger mt-1">{errors.senderZipcode?.message}</p>
					</FormGroup>
				</Col>
				<Col md={2}>
					<FormGroup floating className="mb-3">
						<input 
							type="text" 
							className="form-control" 
							id="senderState" 
							placeholder="State"
							{...register("senderState", {
								required: {
									value: true,
									message: 'State is required'
								}
							})}
						/>
						<Label htmlFor="senderState">
							State<span className="text-danger">*</span>
						</Label>
						<p className="text-danger mt-1">{errors.senderState?.message}</p>
					</FormGroup>
				</Col>
			</Row>

			{/* Receiver */}
      <Row>
        <Label className="fw-bold">Destination</Label>
      </Row>
			<Row>
				<Col md={4}>
					<FormGroup floating className="mb-3">
						<input 
							type="text" 
							className="form-control" 
							id="receiver" 
							placeholder="Receiver Name"
							{...register("Receiver", {
								required: {
									value: true,
									message: 'Receiver is required'
								}
							})}
						/>
						<Label htmlFor="receiver">
							Receiver Name<span className="text-danger">*</span>
						</Label>
						<p className="text-danger mt-1">{errors.Receiver?.message}</p>
					</FormGroup>
				</Col>
			</Row>
			<Row>
				<Col md={5}>
					<FormGroup floating className="mb-3">
						<input 
							type="text" 
							className="form-control" 
							id="receiverHouseAndStreet" 
							placeholder="123 Sesame St"
							{...register("receiverHouseAndStreet", {
								required: {
									value: true,
									message: 'House number and street is required'
								}
							})}
						/>
						<Label htmlFor="receiverHouseAndStreet">
							House Number and Street Address<span className="text-danger">*</span>
						</Label>
						<p className="text-danger mt-1">{errors.receiverHouseAndStreet?.message}</p>
					</FormGroup>
				</Col>
				<Col md={3}>
					<FormGroup floating className="mb-3">
						<input 
							type="text" 
							className="form-control" 
							id="receiverCity" 
							placeholder="Houston"
							{...register("receiverCity", {
								required: {
									value: true,
									message: 'City is required'
								}
							})}
						/>
						<Label htmlFor="receiverCity">
							City<span className="text-danger">*</span>
						</Label>
						<p className="text-danger mt-1">{errors.receiverCity?.message}</p>
					</FormGroup>
				</Col>
				<Col md={2}>
					<FormGroup floating className="mb-3">
						<input 
							type="text" 
							className="form-control" 
							id="receiverZipcode" 
							placeholder="Zipcode"
							{...register("receiverZipcode", {
								required: {
									value: true,
									message: 'Zipcode is required'
								}
							})}
						/>
						<Label htmlFor="receiverZipcode">
							Zipcode<span className="text-danger">*</span>
						</Label>
						<p className="text-danger mt-1">{errors.receiverZipcode?.message}</p>
					</FormGroup>
				</Col>
				<Col md={2}>
					<FormGroup floating className="mb-3">
						<input 
							type="text" 
							className="form-control" 
							id="receiverState" 
							placeholder="State"
							{...register("receiverState", {
								required: {
									value: true,
									message: 'State is required'
								}
							})}
						/>
						<Label htmlFor="receiverState">
							State<span className="text-danger">*</span>
						</Label>
						<p className="text-danger mt-1">{errors.receiverState?.message}</p>
					</FormGroup>
				</Col>
			</Row>
      <Row>
        <Label className="fw-bold">Description of Package</Label>
      </Row>
			{/* Description of package */}
			<Row>
				<Col md={6}>
					<FormGroup floating className="mb-3">
						<input 
							type="text" 
							className="form-control" 
							id="DescriptionOfItem" 
							placeholder="Description"
							{...register("DescriptionOfItem")}
						/>
						<Label htmlFor="DescriptionOfItem">
							Description of Package
						</Label>
					</FormGroup>
				</Col>
				<Col md={2}>
					<FormGroup floating className="mb-3">
						<select className="form-select" id="PackageTypeId"
							defaultValue={1}
							{...register("PackageTypeId")}>
							{/* <option selected>Select package type</option> */}
							<option value={1}>Package</option>
							<option value={2}>Envelope</option>
						</select>
						<Label htmlFor="PackageTypeId">
							Package type
						</Label>
					</FormGroup>
				</Col>
				<Col md={4}>
					<FormGroup floating className="mb-3">
						<input 
							type="number" 
							className="form-control" 
							id="DeclaredValue" 
							placeholder="Declared Value"
							{...register("DeclaredValue", {
								valueAsNumber: true,
								pattern: {
									value: /d*/,
									message: 'Please enter a number',
								},
								min: {
									value: 1,
									message: 'Declared value must be more than 0' 
								}
								})}
						/>
						<Label htmlFor="DeclaredValue">
							Delcared value of item
						</Label>
						<p className="text-danger mt-1">{errors.DeclaredValue?.message}</p>

					</FormGroup>
				</Col>
			</Row>
			<Row>
				<Col md={2}>
					<FormGroup floating className="mb-3">
						<input 
							type="number" 
							className="form-control" 
							id="Weight" 
							placeholder="Weight"
							step="0.5"
							{...register("Weight", {
								valueAsNumber: true,
								required: {
									value: true,
									message: 'Weight is required'
								},
								pattern: {
									value: /d*/,
									message: 'Please enter a number',
								},
								min: {
									value: 0.5,
									message: 'Declared value must be more than 0.5 lbs' 
								}
								})}
						/>
						<Label htmlFor="Weight">
							Weight
						</Label>
						<p className="text-danger mt-1">{errors.Weight?.message}</p>

					</FormGroup>
				</Col>
				<Col md={2}>
					<FormGroup floating className="mb-3">
						<input 
							type="number" 
							className="form-control" 
							id="Length" 
							placeholder="Length"
							step="0.1"
							{...register("Length", {
								valueAsNumber: true,
								min: {
									value: 0.5,
									message: 'Length must be more than 0.5"' 
								}
								})}
						/>
						<Label htmlFor="Length">
							Length
						</Label>
						<p className="text-danger mt-1">{errors.Length?.message}</p>

					</FormGroup>
				</Col>
				<Col md={2}>
					<FormGroup floating className="mb-3">
						<input 
							type="number" 
							className="form-control" 
							id="Width" 
							placeholder="Width"
							step="0.1"
							{...register("Width", {
								valueAsNumber: true,
								min: {
									value: 0.5,
									message: 'Width must be more than 0.5"' 
								}
								})}
						/>
						<Label htmlFor="Width">
							Width
						</Label>
						<p className="text-danger mt-1">{errors.Width?.message}</p>

					</FormGroup>
				</Col>
				<Col md={2}>
					<FormGroup floating className="mb-3">
						<input 
							type="number" 
							className="form-control" 
							id="Depth" 
							placeholder="Depth"
							step="0.1"
							{...register("Depth", {
								valueAsNumber: true,
								min: {
									value: 0.5,
									message: 'Depth must be more than 0.5"' 
								}
								})}
						/>
						<Label htmlFor="Depth">
							Depth
						</Label>
						<p className="text-danger mt-1">{errors.Depth?.message}</p>

					</FormGroup>
				</Col>
			</Row>
			<Row>
				<Col md={4}>
					<FormGroup floating className="mb-3">
						<select className="form-select" id="SignatureRequired"
							defaultValue={1}
							{...register("SignatureRequired")}>
							<option value={1}>Yes</option>
							<option value={0}>No</option>
						</select>
						<Label htmlFor="SignatureRequired">
							Signature required?
						</Label>
					</FormGroup>
				</Col>
				<Col md={4}>
					<FormGroup floating className="mb-3">
						<select className="form-select" id="insurance"
							defaultValue={1}
							{...register("Insurance")}>
							<option value={1}>Yes</option>
							<option value={0}>No</option>
						</select>
						<Label htmlFor="Insurance">
							Insurance?
						</Label>
					</FormGroup>
				</Col>
			</Row>
      {(authentication.role == Roles[1] || authentication.role == Roles[2]) &&
      <Row className="mb-3">
        <Label>
          Sender customer:
        </Label>
        <SearchCustomer setCustomerSelected={setCustomerSelected} />
      </Row>
      }
			<Button className="btn-primary fw-bold float-end" type="submit" >
				Submit
			</Button>
		</Form>
		
	</> 
	:
	<Card>
		<CardBody>
			<p className="text-left">Tracking number: <span className="fw-bold fst-italic">{showTrackingNumber}</span></p>
			<Button className="btn-primary float-end" onClick={() => {setShowTrackingNumber(null);}}>Create a new package</Button>
		</CardBody>
		</Card>
		}
		</>
	);
};
