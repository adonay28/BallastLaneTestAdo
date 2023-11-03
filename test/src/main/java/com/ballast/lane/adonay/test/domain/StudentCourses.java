package com.ballast.lane.adonay.test.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class StudentCourses {
    @EmbeddedId
    private StudentCoursesId id;

    @ManyToOne
    @MapsId("studentId")
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @MapsId("courseId")
    @JoinColumn(name = "course_id")
    private Course course;

    @Temporal(TemporalType.DATE)
    private Date startDate;

    private String status;

    public StudentCourses(StudentCoursesId studentCoursesId, Student student, Course course, String status) {
        this.id = studentCoursesId;
        this.student = student;
        this.course = course;
        this.status = status;
        this.startDate = new Date();
    }
}
