package com.vkr.tms.model;

import lombok.Data;

import javax.persistence.*;
import javax.transaction.Transactional;

@Data
@Entity
@Table(name="RoleMember")
public class RoleMember {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    @JoinColumn(name="user_id", referencedColumnName = "id")
    Usr user;

    @ManyToOne
    @JoinColumn(name="project_id", referencedColumnName = "id")
    Project project;
}
