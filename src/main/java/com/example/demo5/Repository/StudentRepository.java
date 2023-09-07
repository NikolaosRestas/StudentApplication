package com.example.demo5.Repository;

import com.example.demo5.Model.Student;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student,Long> {
    @Transactional
    @Modifying
    @Query("delete from Student cust where cust.id = :studentId")
    int deleteStudentById(@Param("studentId") Long id);
}
