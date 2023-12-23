package com.vkr.tms.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="Status_Schema")
public class Status_Schema {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "ordering")
    private int ordering;

    @OneToOne
    @JoinColumn(name="schema_id", referencedColumnName = "id")
    WorkflowSchema workflowSchema;

    @OneToOne
    @JoinColumn(name="status_id", referencedColumnName = "id")
    Status status;

}
