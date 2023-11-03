package com.ballast.lane.adonay.test.repositories;

import com.ballast.lane.adonay.test.domain.Course;
import com.ballast.lane.adonay.test.domain.StudentCourses;
import com.ballast.lane.adonay.test.domain.StudentCoursesId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudentCoursesRepository  extends JpaRepository<StudentCourses, StudentCoursesId> {
    @Query("select c.course from StudentCourses c where c.student.id = :studentId and c.status = 'ACTIVE'")
    List<Course> getRegisteredCoursesAndActive(@Param("studentId") Long studentId);
}
