package com.example.demo5;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.util.Arrays;


public class Student_Application extends JFrame {
    private JTextField lastname;
    private JTextField email;
    private JTextField firstname;
    private JTextField phone;
    private JPasswordField passwordField1;
    private JButton saveButton;
    private JPanel MainPanel;
    private JTextField id;
    private JTextField address;


    public Student_Application(){
        setContentPane(MainPanel);
        setTitle("Student Application");
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setSize(300,200);
        setLocationRelativeTo(null);
        setVisible(true);

        saveButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String id = Student_Application.this.id.getText();
                String firstname = Student_Application.this.firstname.getText();
                String lastname = Student_Application.this.lastname.getText();
                String address = Student_Application.this.address.getText();
                String email = Student_Application.this.email.getText();
                String phone = Student_Application.this.phone.getText();
                char[] password = Student_Application.this.passwordField1.getPassword();

                try {
                    Connection connection = DriverManager.getConnection("jdbc:postgresql://localhost:5432/Student", "postgres", "1234");

                    String query = "INSERT INTO student values(' " + id + "','" + address + "','" + email + "','" +
                            firstname + "','"+lastname + "','" + Arrays.toString(password) + "','" + phone + "')";

                    Statement sta = connection.createStatement();
                    int x = sta.executeUpdate(query);
                    if (x == 0) {
                        JOptionPane.showMessageDialog(saveButton, "This is alredy exists");
                    } else {
                        JOptionPane.showMessageDialog(saveButton,
                                 "Student saved:");
                    }

                    connection.close();
                } catch (Exception exception) {
                    exception.printStackTrace();
                }
            }

        });
    }

    public static void main(String args[]){
        new Student_Application();
    }
}