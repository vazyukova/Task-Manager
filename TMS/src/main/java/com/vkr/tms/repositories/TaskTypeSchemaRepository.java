package com.vkr.tms.repositories;

import com.vkr.tms.model.TaskTypeSchema;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskTypeSchemaRepository extends JpaRepository<TaskTypeSchema, Integer> {
}
