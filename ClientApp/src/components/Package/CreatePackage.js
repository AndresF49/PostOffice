import { Container, Row, Col, Button, Form, Label, FormGroup } from "reactstrap";
import { useForm } from 'react-hook-form'
import { useState } from 'react';

export default function CreatePackage() {
	const { register, handleSubmit, formState } = useForm();
	const { errors } = formState
	const [packageInfo, setPackageInfo] = useState();

	const onSubmit = (data) => {
		setPackageInfo(data)
		console.log(data);
	};

	return (
		<>
			<Container >
				<h5 className="text-center mb-5 fw-light fs-2">Create a Package</h5>
				<Form noValidate onSubmit={ handleSubmit(onSubmit) }  className="border border-2 p-3 rounded clearfix">
					{/* Sender */}
					<Row>
						<Col md={4}>
							<FormGroup floating className="mb-3">
								<input 
									type="text" 
									className="form-control" 
									id="sender" 
									placeholder="Sender"
									{...register("sender", {
										required: {
											value: true,
											message: 'Sender is required'
										}
									})}
								/>
								<Label htmlFor="sender">
									Sender
								</Label>
								<p className="text-danger mt-1">{errors.sender?.message}</p>
							</FormGroup>
						</Col>
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
									House Number and Street Address
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
									City
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
									Zipcode
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
									State
								</Label>
								<p className="text-danger mt-1">{errors.senderState?.message}</p>
							</FormGroup>
						</Col>
					</Row>

					{/* Receiver */}

					<Row>
						<Col md={4}>
							<FormGroup floating className="mb-3">
								<input 
									type="text" 
									className="form-control" 
									id="receiver" 
									placeholder="Receiver"
									{...register("receiver", {
										required: {
											value: true,
											message: 'Receiver is required'
										}
									})}
								/>
								<Label htmlFor="receiver">
									Receiver
								</Label>
								<p className="text-danger mt-1">{errors.receiver?.message}</p>
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
									House Number and Street Address
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
									City
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
									Zipcode
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
									State
								</Label>
								<p className="text-danger mt-1">{errors.receiverState?.message}</p>
							</FormGroup>
						</Col>
					</Row>

					{/* Description of package */}
					<Row>
						<Col md={6}>
							<FormGroup floating className="mb-3">
								<input 
									type="text" 
									className="form-control" 
									id="descriptionOfPackage" 
									placeholder="Description"
									{...register("descriptionOfPackage")}
								/>
								<Label htmlFor="descriptionOfPackage">
									Description of Package
								</Label>
							</FormGroup>
						</Col>
						<Col md={2}>
							<FormGroup floating className="mb-3">
								<select className="form-select" id="packageType"
									defaultValue={"Package"}
									{...register("packageType")}>
									{/* <option selected>Select package type</option> */}
									<option value={1}>Package</option>
									<option value={2}>Envelope</option>
								</select>
								<Label htmlFor="packageType">
									Package type
								</Label>
							</FormGroup>
						</Col>
						<Col md={4}>
							<FormGroup floating className="mb-3">
								<input 
									type="number" 
									className="form-control" 
									id="declaredValue" 
									placeholder="Declared Value"
									{...register("declaredValue", {
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
								<Label htmlFor="declaredValue">
									Delcared value of item
								</Label>
								<p className="text-danger mt-1">{errors.declaredValue?.message}</p>

							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col md={2}>
							<FormGroup floating className="mb-3">
								<input 
									type="number" 
									className="form-control" 
									id="weight" 
									placeholder="Weight"
									step="0.5"
									{...register("weight", {
										valueAsNumber: true,
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
								<Label htmlFor="weight">
									Weight
								</Label>
								<p className="text-danger mt-1">{errors.weight?.message}</p>

							</FormGroup>
						</Col>
						<Col md={2}>
							<FormGroup floating className="mb-3">
								<input 
									type="number" 
									className="form-control" 
									id="length" 
									placeholder="Length"
									step="0.1"
									{...register("length", {
										valueAsNumber: true,
										min: {
											value: 0.5,
											message: 'Length must be more than 0.5"' 
										}
									  })}
								/>
								<Label htmlFor="length">
									Length
								</Label>
								<p className="text-danger mt-1">{errors.length?.message}</p>

							</FormGroup>
						</Col>
						<Col md={2}>
							<FormGroup floating className="mb-3">
								<input 
									type="number" 
									className="form-control" 
									id="width" 
									placeholder="Width"
									step="0.1"
									{...register("width", {
										valueAsNumber: true,
										min: {
											value: 0.5,
											message: 'Width must be more than 0.5"' 
										}
									  })}
								/>
								<Label htmlFor="width">
									Width
								</Label>
								<p className="text-danger mt-1">{errors.width?.message}</p>

							</FormGroup>
						</Col>
						<Col md={2}>
							<FormGroup floating className="mb-3">
								<input 
									type="number" 
									className="form-control" 
									id="depth" 
									placeholder="Depth"
									step="0.1"
									{...register("depth", {
										valueAsNumber: true,
										min: {
											value: 0.5,
											message: 'Depth must be more than 0.5"' 
										}
									  })}
								/>
								<Label htmlFor="depth">
									Depth
								</Label>
								<p className="text-danger mt-1">{errors.depth?.message}</p>

							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col md={4}>
							<FormGroup floating className="mb-3">
								<select className="form-select" id="signatureRequired"
									defaultValue={"Yes"}
									{...register("signatureRequired")}>
									<option value="Yes">Yes</option>
									<option value="No">No</option>
								</select>
								<Label htmlFor="signatureRequired">
									Signature required?
								</Label>
							</FormGroup>
						</Col>
						<Col md={4}>
							<FormGroup floating className="mb-3">
								<select className="form-select" id="insurance"
									defaultValue={"Yes"}
									{...register("insurance")}>
									<option value="Yes">Yes</option>
									<option value="No">No</option>
								</select>
								<Label htmlFor="insurance">
									Insurance?
								</Label>
							</FormGroup>
						</Col>
					</Row>

					<Button className="btn-primary fw-bold float-end" type="submit" >
						Submit
					</Button>
					
					
				</Form>

			</Container>

		</>
	);
};

// Price=25.34,
// DescriptionOfItem="Electronics", DeclaredValue=125.00, PackageType="Package",
// Weight=15, Length=15, Width=15, Depth=15, SignatureRequired=true,
// Insurance=true