package com.vkr.tms.payload;

import com.vkr.tms.model.Priority;
import com.vkr.tms.model.Task;
import com.vkr.tms.model.Usr;

import java.util.List;

public class ProjectDetails {
    private int projectId;
    private String name;
    private Usr lead;
    private List<Usr> participants;
    private List<Task> tasks;
    private List<Priority> priorities;
    private TaskTypeSchemaBean taskTypeSchema;
    private WorkflowSchemaBean workflowSchema;

    public List<Priority> getPriorities() {
        return priorities;
    }

    public void setPriorities(List<Priority> priorities) {
        this.priorities = priorities;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public ProjectDetails(int projectId, String name, Usr lead, List<Usr> participants, List<Task> tasks, List<Priority> priorities, TaskTypeSchemaBean taskTypeSchema, WorkflowSchemaBean workflowSchema) {
        this.projectId = projectId;
        this.name = name;
        this.lead = lead;
        this.participants = participants;
        this.tasks = tasks;
        this.priorities = priorities;
        this.taskTypeSchema = taskTypeSchema;
        this.workflowSchema = workflowSchema;
    }

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Usr getLead() {
        return lead;
    }

    public void setLead(Usr lead) {
        this.lead = lead;
    }

    public List<Usr> getParticipants() {
        return participants;
    }

    public void setParticipants(List<Usr> participants) {
        this.participants = participants;
    }

    public TaskTypeSchemaBean getTaskTypeSchema() {
        return taskTypeSchema;
    }

    public void setTaskTypeSchema(TaskTypeSchemaBean taskTypeSchema) {
        this.taskTypeSchema = taskTypeSchema;
    }

    public WorkflowSchemaBean getWorkflowSchema() {
        return workflowSchema;
    }

    public void setWorkflowSchema(WorkflowSchemaBean workflowSchema) {
        this.workflowSchema = workflowSchema;
    }
}
