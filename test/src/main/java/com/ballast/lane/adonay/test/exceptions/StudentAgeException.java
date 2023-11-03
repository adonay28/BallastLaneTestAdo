package com.ballast.lane.adonay.test.exceptions;

import java.util.Date;

public class StudentAgeException extends RuntimeException {
    public StudentAgeException(String dob) {
        super("Student age should be greater or equal to 16: " + dob);
    }
}
