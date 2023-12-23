package com.vkr.tms.repositories;

import com.vkr.tms.model.TaskType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskTypeRepository extends JpaRepository<TaskType, Integer> {
}
