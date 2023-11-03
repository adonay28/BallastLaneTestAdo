package com.ballast.lane.adonay.test.exceptions;

public class CourseRegisterException extends RuntimeException {

    public CourseRegisterException() {
        super("Registration of more than 3 courses is not allowed ");
    }
}
