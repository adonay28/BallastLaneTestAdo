package com.ballast.lane.adonay.test.services;

import com.ballast.lane.adonay.test.domain.*;
import com.ballast.lane.adonay.test.dto.TimesheetRequestDTO;
import com.ballast.lane.adonay.test.repositories.StudentCoursesRepository;
import com.ballast.lane.adonay.test.repositories.TimesheetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TimesheetService {
    private TimesheetRepository timesheetRepository;
    private StudentCoursesRepository studentCoursesRepository;

    @Autowired
    public TimesheetService(TimesheetRepository timesheetRepository, StudentCoursesRepository studentCoursesRepository) {
        this.timesheetRepository = timesheetRepository;
        this.studentCoursesRepository = studentCoursesRepository;
    }

    public Timesheet createNewLog(TimesheetRequestDTO timesheetRequestDTO) {
        Timesheet timesheet = new Timesheet();
        timesheet.setDate(timesheetRequestDTO.getDate());
        StudentCoursesId studentCoursesId = new StudentCoursesId(timesheetRequestDTO.getStudentId(), timesheetRequestDTO.getCourseId());
        StudentCourses studentCourses = studentCoursesRepository.getById(studentCoursesId);
        timesheet.setStudentCourses(studentCourses);
        timesheet.setTaskCategory(fromString(timesheetRequestDTO.getTaskCategory()));
        timesheet.setTaskDescription(timesheetRequestDTO.getTaskDescription());
        return timesheetRepository.save(timesheet);
    }

    public List<TimesheetRequestDTO> getAllTimesheet(Long studentId, Long courseId) {
        List<Timesheet> timesheetList = timesheetRepository.getAllByStudentIdAndCourseId(studentId, courseId);
        return timesheetList.stream()
                .map(entity -> new TimesheetRequestDTO(entity.getId(), entity.getDate(),
                        entity.getTaskCategory().name(), entity.getTaskDescription(),
                        courseId, studentId))
                // Add other fields as needed
                .collect(Collectors.toList());
    }

    public static TaskCategory fromString(String inputString) {
        for (TaskCategory category : TaskCategory.values()) {
            if (category.name().equalsIgnoreCase(inputString)) {
                return category;
            }
        }
        throw new IllegalArgumentException("No enum constant found for " + inputString);
    }

    public void deleteEntry(Long timesheetId) {
        this.timesheetRepository.deleteById(timesheetId);
    }
}
