package com.ballast.lane.adonay.test.controllers;

import com.ballast.lane.adonay.test.domain.Course;
import com.ballast.lane.adonay.test.domain.Student;
import com.ballast.lane.adonay.test.domain.StudentCourses;
import com.ballast.lane.adonay.test.domain.StudentCoursesId;
import com.ballast.lane.adonay.test.dto.CourseDto;
import com.ballast.lane.adonay.test.exceptions.CourseRegisterException;
import com.ballast.lane.adonay.test.repositories.StudentCoursesRepository;
import com.ballast.lane.adonay.test.repositories.TimesheetRepository;
import com.ballast.lane.adonay.test.services.CourseService;
import com.ballast.lane.adonay.test.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    private final StudentService studentService;
    private final CourseService courseService;
    private final StudentCoursesRepository studentCoursesRepository;
    private final TimesheetRepository timesheetRepository;

    @Autowired
    public StudentController(StudentService studentService, CourseService courseService,
                             StudentCoursesRepository studentCoursesRepository,
                             TimesheetRepository timesheetRepository) {
        this.studentService = studentService;
        this.courseService = courseService;
        this.studentCoursesRepository = studentCoursesRepository;
        this.timesheetRepository = timesheetRepository;
    }

    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        // Perform validation or additional logic if needed
        Student createdStudent = studentService.createStudent(student);
        return new ResponseEntity<>(createdStudent, HttpStatus.CREATED);
    }

    @GetMapping("/{studentId}/availablecourses")
    public List<Course> getAllAvailableCourses(@PathVariable Long studentId) {
        return courseService.getAllAvailableCoursesForAStudent(studentId);
    }

    @GetMapping("/{studentId}/registeredcourses")
    public List<CourseDto> getAllRegisteredCourses(@PathVariable Long studentId) {
        List<Course> courses = studentCoursesRepository.getRegisteredCoursesAndActive(studentId);
        List<CourseDto> courseDtoList = new ArrayList<>();
        for (Course course : courses) {
            CourseDto courseDto = new CourseDto();
            courseDto.setId(course.getId());
            courseDto.setName(course.getName());
            Long nEntries = timesheetRepository.countByStudentIdAndCourseId(studentId, course.getId());
            courseDto.setTime(nEntries * 30);
            courseDtoList.add(courseDto);
        }

        return courseDtoList;
    }

    @PostMapping("/{studentId}/registerCourse/{courseId}")
    public ResponseEntity<StudentCourses> registerCourse(@PathVariable Long studentId, @PathVariable Long courseId) {
        List<Course> registeredCourses = studentCoursesRepository.getRegisteredCoursesAndActive(studentId);
        if (registeredCourses.size() >= 3) {
            throw new CourseRegisterException();
        }
        Optional<Student> studentOptional = studentService.getStudentByid(studentId);
        Optional<Course> courseOptional = courseService.getCourseById(courseId);

        if(studentOptional.isPresent() && courseOptional.isPresent()) {
            StudentCoursesId studentCoursesId = new StudentCoursesId(studentId, courseId);
            StudentCourses studentCourses = new StudentCourses(studentCoursesId, studentOptional.get(), courseOptional.get(),
                    "ACTIVE");
            this.studentCoursesRepository.saveAndFlush(studentCourses);
            return new ResponseEntity<>(studentCourses, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
