package com.vkr.tms.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="Type_Schema")
public class Type_Schema {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @OneToOne
    @JoinColumn(name="schema_id", referencedColumnName = "id")
    TaskTypeSchema taskTypeSchema;

    @OneToOne
    @JoinColumn(name="type_id", referencedColumnName = "id")
    TaskType taskType;
}
