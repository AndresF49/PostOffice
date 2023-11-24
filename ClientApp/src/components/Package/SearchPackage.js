import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import ShowPackage from './ShowPackage';

const SearchPackage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [resultPackage, setResultPackage] = useState(null);
  const [showNotFound, setShowNotFound] = useState(false);
  const [showBadRequest, setShowBadRequest] = useState(false);

  var packageNotFound = () => {
    return (
      <div>
        <p className='h5 text-center'>Package not found</p>
      </div>
    );
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    const containsOnlyNumbers = /^\d+$/.test(searchTerm);
    //check for empty search term
    if (!searchTerm.trim() || !containsOnlyNumbers) {
      setShowNotFound(false);
      setShowBadRequest(true);
      return;
    }

    setShowBadRequest(false);
    try {
      const response = await fetch('package/SearchPackage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchRequest: searchTerm }),
      });
      if (!response.staus === 404) {
        setResultPackage(null);
        setShowNotFound(true);
        setShowBadRequest(false);
        console.log("package not found")
      }
      else if (!response.ok) {
        //Handle other non-successful responses
        setResultPackage(null);
        setShowNotFound(false);
        setShowBadRequest(false);
        console.log("Error:", response.statusText);
      }
      else {
        const data = await response.json();
        // Handle the response data as needed
        setResultPackage(data);
        setShowNotFound(false);
        setShowBadRequest(false);
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
              setShowBadRequest(false);
            }}
          />
        </FormGroup>
        <Button color="primary" disabled={showBadRequest}>
          Search
        </Button>
      </Form>
      <br></br>
      {resultPackage && <ShowPackage _package={resultPackage[0]} />}
      {showNotFound && packageNotFound()}
      {showBadRequest && (
				<div>
					<p className='h5 text-center'>Please enter a valid tracking ID</p>
				</div>
			)}
    </>
  );
};

export default SearchPackage;
