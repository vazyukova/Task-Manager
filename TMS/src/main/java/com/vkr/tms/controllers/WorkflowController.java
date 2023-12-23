package com.vkr.tms.controllers;

import com.vkr.tms.model.*;
import com.vkr.tms.payload.StatusBean;
import com.vkr.tms.payload.WorkflowSchemaBean;
import com.vkr.tms.repositories.StatusRepository;
import com.vkr.tms.repositories.Status_SchemaRepository;
import com.vkr.tms.repositories.WorkflowSchemaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/workflow")
@CrossOrigin
public class WorkflowController {
    StatusRepository statusRepository;
    WorkflowSchemaRepository workflowSchemaRepository;
    Status_SchemaRepository status_schemaRepository;

    public WorkflowController(StatusRepository statusRepository, WorkflowSchemaRepository workflowSchemaRepository, Status_SchemaRepository status_schemaRepository){
        this.statusRepository = statusRepository;
        this.workflowSchemaRepository = workflowSchemaRepository;
        this.status_schemaRepository = status_schemaRepository;
    }

    @GetMapping(value="/statuses")
    public ResponseEntity<List<Status>> getAllStatuses(){
        List<Status> statuses = statusRepository.findAll();
        if (statuses == null) {
            return ResponseEntity.notFound().build();
        } else {
            return new ResponseEntity<>(statuses, HttpStatus.OK);
        }
    }

    @PostMapping(value="/saveStatus")
    public ResponseEntity<Status> saveStatus(@RequestBody Status status){
        Status statusSaved = statusRepository.save(status);
        if (statusSaved == null){
            return ResponseEntity.status(422).build();
        }
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .buildAndExpand(statusSaved.getId())
                .toUri();
        return ResponseEntity.created(uri)
                .body(statusSaved);
    }

    @GetMapping(value="/deleteStatus/{id}")
    public ResponseEntity<List<Status>> deleteStatus(@PathVariable(name="id") int id){
        statusRepository.delete(statusRepository.findById(id).get());
        return getAllStatuses();
    }

    @GetMapping(value="/schemes")
    public ResponseEntity<List<WorkflowSchemaBean>> getAllWorkflowSchemes(){
        List<WorkflowSchema> workflowSchemas = workflowSchemaRepository.findAll();
        List<WorkflowSchemaBean> schemaBeans = workflowSchemas.stream()
                .map(x -> new WorkflowSchemaBean(x.getId(), x.getName(),
                        status_schemaRepository.getAllByWorkflowSchema(x).stream()
                                .map(y -> new StatusBean(y.getStatus(), y.getOrdering()))
                                .collect(Collectors.toList())))
                .collect(Collectors.toList());
        return new ResponseEntity<>(schemaBeans, HttpStatus.OK);
    }

    @PostMapping(value="/saveSchema")
    public ResponseEntity<List<WorkflowSchemaBean>> saveWorkflowSchema(@RequestBody WorkflowSchemaBean schema){
        WorkflowSchema workflowSchema = new WorkflowSchema();
        workflowSchema.setName(schema.getName());
        WorkflowSchema savedSchema = workflowSchemaRepository.save(workflowSchema);
        for (StatusBean statusBean : schema.getStatusBeans()){
            Status_Schema status_schema = new Status_Schema();
            status_schema.setWorkflowSchema(savedSchema);
            status_schema.setStatus(statusBean.getStatus());
            status_schema.setOrdering(statusBean.getOrdering());
            status_schemaRepository.save(status_schema);
        }
        return getAllWorkflowSchemes();
    }

    @GetMapping(value={"/deleteSchema/{id}"})
    public ResponseEntity<List<WorkflowSchemaBean>> deleteSchema(@PathVariable(name="id") int id){
        WorkflowSchema deletedSchema = workflowSchemaRepository.getById(id);
        status_schemaRepository.deleteAll(status_schemaRepository.getAllByWorkflowSchema(deletedSchema));
        workflowSchemaRepository.delete(deletedSchema);
        return getAllWorkflowSchemes();
    }
}
