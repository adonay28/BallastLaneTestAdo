package com.ballast.lane.adonay.test.domain;

import javax.persistence.*;

import lombok.Getter;

@Entity
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private Long id;
    @Getter
    @Column(unique = true)
    private String name;

    // getters and setters
}
