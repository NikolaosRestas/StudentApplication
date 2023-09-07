package com.example.demo5.Model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="student")
@Getter
@Setter
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @Column(name="firstName")
    private String firstName;
    @Column(name="lastName")
    private String lastName;
    @Column(name="address")
    private String address;
    @Column(name="email")
    private String email;
    @Column(name="phone")
    private String phone;
    @Column(name="password")
    private String password;
}
