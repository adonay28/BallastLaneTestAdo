package com.ballast.lane.adonay.test.repositories;

import com.ballast.lane.adonay.test.domain.Timesheet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TimesheetRepository extends JpaRepository<Timesheet, Long> {
    @Query("SELECT COUNT(t) FROM Timesheet t WHERE t.studentCourses.student.id = :studentId AND t.studentCourses.course.id = :courseId")
    Long countByStudentIdAndCourseId(@Param("studentId") Long studentId, @Param("courseId") Long courseId);

    @Query("SELECT t FROM Timesheet t WHERE t.studentCourses.student.id = :studentId AND t.studentCourses.course.id = :courseId")
    List<Timesheet> getAllByStudentIdAndCourseId(@Param("studentId") Long studentId, @Param("courseId") Long courseId);
}
