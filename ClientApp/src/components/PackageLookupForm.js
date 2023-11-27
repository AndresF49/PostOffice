import React, { Component } from 'react';
import axios from 'axios';
class PackageLookupForm extends Component {
    handleSubmit = async (e) => {
        e.preventDefault();
        const trackingID = e.target.elements.trackingID.value;

        try {
            const response = await axios.get(' /api/packages/${trackingID');
            // Replace '/api/packages' with the actual URL of backend service
            if (response.status == 200) {
                // Check if the request was successful (status code 200)
                const packageData = response.data;
                console.log(packageData);
            } else {
                console.error('Package not found');
            }

        } catch (error) {
            console.error('An error occurred', error);
        }
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="trackingID" placeholder="Enter Tracking ID" />
                    <button type="submit">Search</button>
                </form>
            </div>
        );
    }
}
export default PackageLookupForm;