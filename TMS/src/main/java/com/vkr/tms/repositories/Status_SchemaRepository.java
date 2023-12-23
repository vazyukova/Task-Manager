package com.vkr.tms.repositories;

import com.vkr.tms.model.Status_Schema;
import com.vkr.tms.model.TaskTypeSchema;
import com.vkr.tms.model.Type_Schema;
import com.vkr.tms.model.WorkflowSchema;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Status_SchemaRepository extends JpaRepository<Status_Schema, Integer> {
    List<Status_Schema> getAllByWorkflowSchema(WorkflowSchema schema);
}
