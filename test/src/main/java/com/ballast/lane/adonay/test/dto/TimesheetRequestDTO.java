package com.ballast.lane.adonay.test.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TimesheetRequestDTO {
    private Long id;
    private Date date;
    private String taskCategory;
    private String taskDescription;
    private Long courseId;
    private Long studentId;
}
