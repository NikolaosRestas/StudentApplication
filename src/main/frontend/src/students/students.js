import React, { useEffect, useState } from 'react';
import StudentsTableComponent from './StudentsTableComponent';
import { Button } from '@mui/material';
import NewStudentModal from './NewStudentModal';
import Loader from "../loader/loader";

const StudentsPage = () => {
    const [studentsData, setStudentsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isNewStudentModalOpen, setNewStudentModalOpen] = useState(false);

    useEffect(() => {
        fetch('/students')
            .then(response => response.json())
            .then(data => {
                setStudentsData(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
                setIsLoading(false); // Ensure loading state is updated even on error
            });
    }, []);

    const newStudent = () => {
        setNewStudentModalOpen(true);
    };

    const handleCloseNewStudentModal = () => {
        setNewStudentModalOpen(false);
    };

    const handleSaveNewStudent = student => {
        setStudentsData(prevStudents => [...prevStudents, student]);
        handleCloseNewStudentModal();
    };

    return (
        <div className="flex justify-center">
            <div className="container mx-4 mt-8 w-full max-w-screen-lg">
                <h3 className="text-3xl font-bold mb-4">Students</h3>

                <div className="text-right mb-4">
                    <Button variant="contained" color="primary" onClick={newStudent}>
                        New Student
                    </Button>
                </div>

                {isLoading ? (
                    <Loader />
                ) : (
                    <StudentsTableComponent students={studentsData} onChange={setStudentsData} />
                )}
            </div>

            {isNewStudentModalOpen && (
                <NewStudentModal
                    isOpen={isNewStudentModalOpen}
                    onClose={handleCloseNewStudentModal}
                    onSave={handleSaveNewStudent}
                />
            )}
        </div>
    );
};

export default StudentsPage;