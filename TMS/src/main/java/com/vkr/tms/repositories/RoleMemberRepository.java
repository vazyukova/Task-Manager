package com.vkr.tms.repositories;

import com.vkr.tms.model.Project;
import com.vkr.tms.model.RoleMember;
import com.vkr.tms.model.Usr;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoleMemberRepository extends JpaRepository<RoleMember, Integer> {
    List<RoleMember> findByUser(Usr user);
    List<RoleMember> findByProject(Project project);
    List<RoleMember> findByUserAndProject(Usr user, Project project);
}
