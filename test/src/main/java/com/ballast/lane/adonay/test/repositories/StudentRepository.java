package com.ballast.lane.adonay.test.repositories;

import com.ballast.lane.adonay.test.domain.Student;
import com.ballast.lane.adonay.test.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
