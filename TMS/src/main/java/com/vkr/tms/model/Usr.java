package com.vkr.tms.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "usr")
public class Usr {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(name = "displayName")
    private String displayName;
    @Column(name = "email")
    private String email;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;

    @ElementCollection(targetClass = ERole.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "user_role", joinColumns =  @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    private Set<ERole> roles = new HashSet<>();

    @OneToMany(fetch = FetchType.EAGER)
    @Transient
    private List<RoleMember> roleMembers;

    @OneToMany(fetch = FetchType.EAGER)
    @Transient
    private List<Project> projects;
}
