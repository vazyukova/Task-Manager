package com.vkr.tms.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name="Project")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "name")
    private String name;

    @OneToOne
    @JoinColumn(name="workflowSchema_id", referencedColumnName = "id")
    WorkflowSchema workflowSchema;

    @OneToOne
    @JoinColumn(name="taskTypeSchema_id", referencedColumnName = "id")
    TaskTypeSchema taskTypeSchema;

    @ManyToOne
    @JoinColumn(name="lead_id", referencedColumnName = "id")
    Usr lead;

    @OneToMany(fetch = FetchType.EAGER)
    @Transient
    List<RoleMember> roleMembers;

    @OneToMany(fetch = FetchType.EAGER)
    List<Task> tasks;
}
