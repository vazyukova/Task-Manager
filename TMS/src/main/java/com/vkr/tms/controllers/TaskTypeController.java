package com.vkr.tms.controllers;

import com.vkr.tms.model.*;
import com.vkr.tms.payload.TaskTypeSchemaBean;
import com.vkr.tms.repositories.TaskTypeRepository;
import com.vkr.tms.repositories.TaskTypeSchemaRepository;
import com.vkr.tms.repositories.Type_SchemaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasktype")
@CrossOrigin
public class TaskTypeController {

    TaskTypeRepository taskTypeRepository;
    TaskTypeSchemaRepository taskTypeSchemaRepository;
    Type_SchemaRepository type_schemaRepository;

    public TaskTypeController(TaskTypeRepository taskTypeRepository, TaskTypeSchemaRepository taskTypeSchemaRepository, Type_SchemaRepository type_schemaRepository) {
        this.taskTypeRepository = taskTypeRepository;
        this.taskTypeSchemaRepository = taskTypeSchemaRepository;
        this.type_schemaRepository = type_schemaRepository;
    }

    @GetMapping(value="/tasktypes")
    public ResponseEntity<List<TaskType>> getAllTaskTypes(){
        List<TaskType> taskTypes = taskTypeRepository.findAll();
        if (taskTypes == null) {
            return ResponseEntity.notFound().build();
        } else {
            return new ResponseEntity<>(taskTypes, HttpStatus.OK);
        }
    }

    @PostMapping(value = "/saveTaskType", consumes = "application/json", produces = "application/json")
    public ResponseEntity<TaskType> saveTaskType(@RequestBody TaskType taskType){
        TaskType taskTypeSaved = taskTypeRepository.save(taskType);
        if (taskTypeSaved == null){
            return ResponseEntity.status(422).build();
        }
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .buildAndExpand(taskTypeSaved.getId())
                .toUri();
        return ResponseEntity.created(uri)
                .body(taskTypeSaved);
    }

    @GetMapping(value="deleteTaskType/{id}")
    public ResponseEntity<List<TaskType>> deleteUser(@PathVariable(name="id") int id){
        taskTypeRepository.delete(taskTypeRepository.findById(id).get());
        List<TaskType> taskTypes = taskTypeRepository.findAll();
        if (taskTypes == null) {
            return ResponseEntity.notFound().build();
        } else {
            return new ResponseEntity<>(taskTypes, HttpStatus.OK);
        }
    }

    @GetMapping(value="/schemas")
    public ResponseEntity<List<TaskTypeSchemaBean>> getAllSchemes(){
        List<TaskTypeSchema> taskTypeSchemas = taskTypeSchemaRepository.findAll();
        List<TaskTypeSchemaBean> schemaBeans = taskTypeSchemas.stream()
                .map(x -> new TaskTypeSchemaBean(x.getId(), x.getName(),
                        type_schemaRepository.getAllByTaskTypeSchema(x).stream().map(Type_Schema::getTaskType).collect(Collectors.toList())))
                .collect(Collectors.toList());
        return new ResponseEntity<>(schemaBeans, HttpStatus.OK);
    }

    @PostMapping(value="/saveSchema")
    public ResponseEntity<List<TaskTypeSchemaBean>> saveSchema(@RequestBody TaskTypeSchemaBean schema){
        TaskTypeSchema taskTypeSchema = new TaskTypeSchema();
        taskTypeSchema.setName(schema.getName());
        TaskTypeSchema savedSchema = taskTypeSchemaRepository.save(taskTypeSchema);
        for (TaskType taskType : schema.getTaskTypes()){
            Type_Schema type_schema = new Type_Schema();
            type_schema.setTaskTypeSchema(savedSchema);
            type_schema.setTaskType(taskType);
            type_schemaRepository.save(type_schema);
        }
        return getAllSchemes();
    }

    @GetMapping(value={"/deleteSchema/{id}"})
    public ResponseEntity<List<TaskTypeSchemaBean>> deleteSchema(@PathVariable(name="id") int id){
        TaskTypeSchema deletedSchema = taskTypeSchemaRepository.getById(id);
        type_schemaRepository.deleteAll(type_schemaRepository.getAllByTaskTypeSchema(deletedSchema));
        taskTypeSchemaRepository.delete(deletedSchema);
        return getAllSchemes();
    }
}
