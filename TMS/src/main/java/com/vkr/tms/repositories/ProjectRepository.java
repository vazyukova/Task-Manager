package com.vkr.tms.repositories;

import com.vkr.tms.model.Project;
import com.vkr.tms.model.Usr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {
    List<Project> findByLead(Usr lead);
}
