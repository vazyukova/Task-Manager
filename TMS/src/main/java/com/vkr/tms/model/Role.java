package com.vkr.tms.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name="name",length = 20)
    private ERole name;
}
