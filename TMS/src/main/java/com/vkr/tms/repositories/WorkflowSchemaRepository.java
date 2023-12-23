package com.vkr.tms.repositories;

import com.vkr.tms.model.WorkflowSchema;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkflowSchemaRepository extends JpaRepository<WorkflowSchema, Integer> {
}
