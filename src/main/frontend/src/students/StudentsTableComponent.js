import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Alert, Button } from "@mui/material";
import EditStudentModal from "./EditStudentModal";

export default function StudentsTableComponent({ students, onChange }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState({});
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isSuccessfulDelete, setIsSuccessfulDelete] = useState(false);

    const handleEditModalOpen = (student) => {
        setSelectedStudent(student);
        setIsEditModalOpen(true);
    };

    const handleDelete = (student) => {
        fetch(`/students/${student.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => {
                if (response.ok) {
                    setIsSuccessfulDelete({ studentFirstName: student.firstName });
                    setIsSuccessfulDelete({ studentLastName: student.lastName });
                    setIsSuccessfulDelete({ studentAddress: student.address });
                    setIsSuccessfulDelete({ studentEmail: student.email });
                    setIsSuccessfulDelete({ studentPhone: student.phone });
                    setIsSuccessfulDelete({ studentPassword: student.password });
                    setTimeout(() => {
                        setIsSuccessfulDelete(false);
                    }, 5000);
                    onChange(students.filter(c => c.id !== student.id));
                }
            });
    };

    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
    };

    return (
        <React.Fragment>
            <TableContainer component={Paper} className="shadow-lg rounded-lg">
                <Table className="min-w-max" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="font-bold">Id</TableCell>
                            <TableCell align="right" className="font-bold">firstName</TableCell>
                            <TableCell align="right" className="font-bold">lastName</TableCell>
                            <TableCell align="right" className="font-bold">Address</TableCell>
                            <TableCell align="right" className="font-bold">Email</TableCell>
                            <TableCell align="right" className="font-bold">Phone</TableCell>
                            <TableCell align="right" className="font-bold">Password</TableCell>
                            <TableCell align="right" className="font-bold">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow
                                key={student.id}
                                className="hover:bg-gray-100"
                            >
                                <TableCell component="th" scope="row" className="py-3">
                                    {student.id}
                                </TableCell>
                                <TableCell align="right" className="py-3">{student.firstName}</TableCell>
                                <TableCell align="right" className="py-3">{student.lastName}</TableCell>
                                <TableCell align="right" className="py-3">{student.address}</TableCell>
                                <TableCell align="right" className="py-3">{student.email}</TableCell>
                                <TableCell align="right" className="py-3">{student.phone}</TableCell>
                                <TableCell align="right" className="py-3">{student.password}</TableCell>
                                <TableCell align="right" className="py-3">
                                    <Button className="mr-2" variant="contained" color="primary" onClick={() => handleEditModalOpen(student)}>
                                        Edit
                                    </Button>
                                    <span className="inline-block w-4"></span> {/* This creates space */}
                                    <Button variant="contained" color="primary" onClick={() => handleDelete(student)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {selectedStudent && (
                <EditStudentModal
                    isOpen={isEditModalOpen}
                    onClose={handleEditModalClose}
                    clientData={selectedStudent}
                />
            )}

            {isSuccessfulDelete && (
                <div className="relative h-32 flex flex-nowrap">
                    <div className="absolute inset-x-0 bottom-0 h-16 flex flex-nowrap">
                        <Alert severity="success">
                            The student was deleted successfully!
                        </Alert>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}