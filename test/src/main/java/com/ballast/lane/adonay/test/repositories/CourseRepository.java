package com.ballast.lane.adonay.test.repositories;

import com.ballast.lane.adonay.test.domain.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseRepository  extends JpaRepository<Course, Long> {
    @Query("SELECT c FROM Course c " +
            "LEFT JOIN StudentCourses sc ON c.id = sc.course.id AND sc.student.id = :studentId " +
            "WHERE sc.student.id IS NULL")
    List<Course> findCoursesNotRelatedToStudent(@Param("studentId") Long studentId);
}
