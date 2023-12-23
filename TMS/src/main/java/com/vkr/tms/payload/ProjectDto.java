package com.vkr.tms.payload;

import com.vkr.tms.model.Project;
import com.vkr.tms.model.TaskTypeSchema;
import com.vkr.tms.model.Usr;
import com.vkr.tms.model.WorkflowSchema;

public class ProjectDto {
    private Integer id;
    private String name;
    private Usr lead;
    private WorkflowSchema workflowSchema;
    private TaskTypeSchema taskTypeSchema;

    public ProjectDto(Project project)
    {
        this.id = project.getId();
        this.name = project.getName();
        this.lead = project.getLead();
        this.workflowSchema = project.getWorkflowSchema();
        this.taskTypeSchema = project.getTaskTypeSchema();
    }

    public Integer getId(){
        return id;
    }

    public String getName(){
        return name;
    }

    public WorkflowSchema getWorkflowSchema()
    {
        return workflowSchema;
    }

    public TaskTypeSchema getTaskTypeSchema()
    {
        return taskTypeSchema;
    }

    public Usr getLead()
    {
        return lead;
    }
}
