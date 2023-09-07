import React, {useEffect, useState} from 'react';
import {Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';

export default function NewStudentModal({isOpen, onClose, onSave}) {
    const [student, setStudent] = useState({name: ""});
    const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);

    useEffect(() => {
        setStudent({...student}); // Update local state when the clientData prop changes
    }, [student]);

    const handleSave = () => {
        fetch(`/students/add`,
            {
                method: 'POST',
                body: JSON.stringify(student),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then((data) => {
                onSave(data);
                setIsSuccessAlertOpen(true);
                setTimeout(() => {
                    setIsSuccessAlertOpen(false);
                }, 5000);
            })
            .catch((error) => {
                console.error('Error while calling the API:', error);
            });

        console.log("Save changes:", student);
        onClose(); // Close the modal after saving (you can modify this based on your requirements).
    };

    const handleCancel = () => {
        onClose(); // Close the modal without saving.
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setStudent((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <React.Fragment>
            <Dialog open={isOpen} onClose={onClose}>
                <DialogTitle>New Student</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Student firstName"
                        name="firstName"
                        value={student.firstName}
                        onChange={(e) => handleInputChange(e)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Student lastName"
                        name="lastName"
                        value={student.lastName}
                        onChange={(e) => handleInputChange(e)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Student Address"
                        name="address"
                        value={student.address}
                        onChange={(e) => handleInputChange(e)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Student Email"
                        name="email"
                        value={student.email}
                        onChange={(e) => handleInputChange(e)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Student Phone"
                        name="phone"
                        value={student.phone}
                        onChange={(e) => handleInputChange(e)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Student Password"
                        name="password"
                        value={student.password}
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
                    {isSuccessAlertOpen && <Alert severity="success">The Student added successfully!</Alert>}
                </div>
            </div>
        </React.Fragment>
    );
}