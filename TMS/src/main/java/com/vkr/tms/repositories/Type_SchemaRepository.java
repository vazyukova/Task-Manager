package com.vkr.tms.repositories;

import com.vkr.tms.model.TaskTypeSchema;
import com.vkr.tms.model.Type_Schema;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Type_SchemaRepository extends JpaRepository<Type_Schema, Integer> {
    List<Type_Schema> getAllByTaskTypeSchema(TaskTypeSchema schema);
}
