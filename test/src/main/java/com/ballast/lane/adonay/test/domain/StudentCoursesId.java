package com.ballast.lane.adonay.test.domain;

import lombok.*;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class StudentCoursesId implements Serializable {
    private Long studentId;
    private Long courseId;
}
