package com.ballast.lane.adonay.test.services;

import com.ballast.lane.adonay.test.domain.Role;
import com.ballast.lane.adonay.test.domain.Student;
import com.ballast.lane.adonay.test.exceptions.SqlConstraintException;
import com.ballast.lane.adonay.test.exceptions.StudentAgeException;
import com.ballast.lane.adonay.test.repositories.RoleRepository;
import com.ballast.lane.adonay.test.repositories.StudentRepository;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public StudentService(StudentRepository studentRepository,
                          RoleRepository roleRepository,
                          PasswordEncoder passwordEncoder) {
        this.studentRepository = studentRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Student createStudent(Student student) {
        LocalDate localDateDOB = student.getDateOfBirth().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Period period = Period.between(localDateDOB, LocalDate.now());
        if (period.getYears() < 16) {
            throw new StudentAgeException(localDateDOB.toString());
        }
        student.setUsername(student.getEmail());
        student.setPassword(passwordEncoder.encode(student.getEmail()));
        Role studentRole = roleRepository.findByNameEqualsIgnoreCase("student");
        student.addRole(studentRole);
        try {
            return studentRepository.save(student);
        } catch (DataIntegrityViolationException e) {
            if (e.getMessage().toLowerCase().contains("unique_email")) {
                throw new SqlConstraintException("Email address is unique");
            }
            throw new SqlConstraintException(e.getMessage());
        }
    }

    public Optional<Student> getStudentByid(Long studentid) {
        return this.studentRepository.findById(studentid);
    }
}
