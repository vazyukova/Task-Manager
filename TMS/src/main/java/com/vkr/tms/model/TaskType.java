package com.vkr.tms.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="TaskType")
public class TaskType {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(name = "name")
    private String name;
}
