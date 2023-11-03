package com.ballast.lane.adonay.test.controllers;

import com.ballast.lane.adonay.test.domain.Course;
import com.ballast.lane.adonay.test.domain.TaskCategory;
import com.ballast.lane.adonay.test.domain.Timesheet;
import com.ballast.lane.adonay.test.dto.TimesheetRequestDTO;
import com.ballast.lane.adonay.test.services.TimesheetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/api/timesheet")
public class TimesheetController {
    @Autowired
    private TimesheetService timesheetService;

    @PostMapping
    public ResponseEntity<Timesheet> createCourse(@RequestBody TimesheetRequestDTO timesheetRequestDTO) {
        Timesheet timesheet = timesheetService.createNewLog(timesheetRequestDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/categories")
    public Collection<TaskCategory> getCategories() {
        return List.of(TaskCategory.values());
    }

    @GetMapping("/{courseId}/{studentId}")
    public List<TimesheetRequestDTO> getAllTimesheet(@PathVariable Long courseId, @PathVariable Long studentId){
        return timesheetService.getAllTimesheet(studentId, courseId);
    }

    @DeleteMapping("/{timesheetId}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long timesheetId) {
        timesheetService.deleteEntry(timesheetId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
