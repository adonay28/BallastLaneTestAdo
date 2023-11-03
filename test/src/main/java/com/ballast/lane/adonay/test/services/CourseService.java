package com.ballast.lane.adonay.test.services;

import com.ballast.lane.adonay.test.domain.Course;
import com.ballast.lane.adonay.test.repositories.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public List<Course> getAllAvailableCoursesForAStudent(Long studentId) {
        return courseRepository.findCoursesNotRelatedToStudent(studentId);
    }

    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }

    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    public Course updateCourse(Long id, Course updatedCourse) {
        if (courseRepository.existsById(id)) {
            updatedCourse.setId(id);
            return courseRepository.save(updatedCourse);
        }
        return null; // Course not found
    }

    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }
}
