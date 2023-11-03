package com.ballast.lane.adonay.test.config;

import com.ballast.lane.adonay.test.exceptions.CourseRegisterException;
import com.ballast.lane.adonay.test.exceptions.SqlConstraintException;
import com.ballast.lane.adonay.test.exceptions.StudentAgeException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({SqlConstraintException.class, StudentAgeException.class, CourseRegisterException.class})
    public ResponseEntity<String> handleSQLConstraintsException(Exception ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }


}
