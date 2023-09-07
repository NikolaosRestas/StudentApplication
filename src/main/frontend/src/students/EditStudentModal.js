import React, {useEffect, useState} from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Alert} from '@mui/material';

export default function EditStudentModal({isOpen, onClose, clientData, onSave}) {
    const [editedData, setEditedData] = useState({...clientData});
    const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);

    useEffect(() => {
        setEditedData({...clientData}); // Update local state when the clientData prop changes
    }, [clientData]);

    const handleSave = () => {
        clientData.firstName = editedData.firstName;
        clientData.lastName = editedData.lastName;
        clientData.address = editedData.address;
        clientData.email = editedData.email;
        clientData.phone = editedData.phone;
        clientData.password = editedData.password;

        fetch(`/students/${clientData.id}`,
            {
                method: 'PUT',
                body: JSON.stringify(clientData),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then((data) => {
                setIsSuccessAlertOpen(true);
                setTimeout(() => {
                    setIsSuccessAlertOpen(false);
                }, 5000);
            })
            .catch((error) => {
                console.error('Error while calling the API:', error);
            });

        console.log("Save changes:", clientData);
        onClose(); // Close the modal after saving (you can modify this based on your requirements).
    };

    const handleCancel = () => {
        onClose(); // Close the modal without saving.
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setEditedData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <React.Fragment>
            <Dialog open={isOpen} onClose={onClose}>
                <DialogTitle>Edit Student</DialogTitle>
                <DialogContent>
                    <TextField
                        label="firstName"
                        name="firstName"
                        value={editedData.firstName}
                        onChange={(e) => handleInputChange(e)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="lastName"
                        name="lastName"
                        value={editedData.lastName}
                        onChange={(e) => handleInputChange(e)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Address"
                        name="address"
                        value={editedData.address}
                        onChange={(e) => handleInputChange(e)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={editedData.email}
                        onChange={(e) => handleInputChange(e)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Phone"
                        name="phone"
                        value={editedData.phone}
                        onChange={(e) => handleInputChange(e)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        name="password"
                        value={editedData.password}
                        onChange={(e) => handleInputChange(e)}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            <div className="relative h-32 flex flex-nowrap">
                <div className="absolute inset-x-0 bottom-0 h-16 flex flex-nowrap">
                    {isSuccessAlertOpen && <Alert severity="success">The Student updated was successful!</Alert>}
                </div>
            </div>
        </React.Fragment>
    );
}