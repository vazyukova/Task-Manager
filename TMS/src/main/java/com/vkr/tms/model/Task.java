package com.vkr.tms.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="Task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "checked")
    private boolean checked;

    @OneToOne
    @JoinColumn(name="status_id", referencedColumnName = "id")
    Status status;

    @OneToOne
    @JoinColumn(name="type_id", referencedColumnName = "id")
    TaskType type;

    @OneToOne
    @JoinColumn(name="priority_id", referencedColumnName = "id")
    Priority priority;

    @OneToOne
    @JoinColumn(name="assignee_id", referencedColumnName = "id")
    Usr assignee;

    @ManyToOne
    @JoinColumn(name="project_id", referencedColumnName = "id")
    Project project;
}
