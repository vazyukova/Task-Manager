package com.vkr.tms.payload;

import com.vkr.tms.model.TaskType;

import java.util.List;

public class TaskTypeSchemaBean {
    private int id;
    private String name;
    private List<TaskType> taskTypes;

    public TaskTypeSchemaBean(int id, String name, List<TaskType> taskTypes) {
        this.id = id;
        this.name = name;
        this.taskTypes = taskTypes;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<TaskType> getTaskTypes() {
        return taskTypes;
    }

    public void setTaskTypes(List<TaskType> taskTypes) {
        this.taskTypes = taskTypes;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
