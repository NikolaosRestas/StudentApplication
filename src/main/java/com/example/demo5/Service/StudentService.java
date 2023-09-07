package com.example.demo5.Service;

import com.example.demo5.Model.Student;
import com.example.demo5.Repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Student> getAllStudents(){
        return studentRepository.findAll();
    }

    public Student findStudentById(Long id){
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Cannot find student with id: %s", id)));
    }

    public boolean deleteStudentById(Long id){
        final int deletedStudent = studentRepository.deleteStudentById(id);
        if (deletedStudent <= 0) {
            throw new RuntimeException(String.format("Cannot find student with id: %s", id));
        }
        return true;
    }
    public Student insertStudent(Student student){
        return studentRepository.save(student);
    }

    public Student updateStudent(Student student) {
        Student savedStudent = findStudentById(student.getId());
        savedStudent.setFirstName(student.getFirstName());
        savedStudent.setLastName(student.getLastName());
        savedStudent.setAddress(student.getAddress());
        savedStudent.setPhone(student.getPhone());
        savedStudent.setEmail(student.getEmail());
        savedStudent.setPassword(student.getPassword());
        return studentRepository.save(savedStudent);
    }
}
