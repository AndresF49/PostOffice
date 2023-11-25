import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const EditPackage = ({ package: initialPackage, onClose }) => {
    const [editedPackage, setEditedPackage] = useState(initialPackage);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedPackage((prevPackage) => ({
            ...prevPackage,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch(`package/${editedPackage.packageId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedPackage),
            });

            if (response.ok) {
                console.log('Package updated successfully');
                onClose();
            } else {
                console.error('Failed to update package:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating package:', error);
        }
    };

    return (
        <div>
            <h2>Edit Package</h2>
            <Form>
                <FormGroup>
                    <Label for="trackingNumber">Tracking Number</Label>
                    <Input
                        type="text"
                        name="trackingNumber"
                        id="trackingNumber"
                        value={editedPackage.trackingNumber}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                {/* Add more form fields for other package details */}
                <Button color="primary" onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </Form>
        </div>
    );
};

export default EditPackage;