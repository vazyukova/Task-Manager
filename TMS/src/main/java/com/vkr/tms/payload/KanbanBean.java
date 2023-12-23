package com.vkr.tms.payload;

import com.vkr.tms.model.Task;

import java.util.ArrayList;
import java.util.List;

public class KanbanBean {
    private String statusName;
    private List<Task> tasks;

    public KanbanBean(String statusName, List<Task> tasks){
        this.statusName = statusName;
        this.tasks = tasks;
    }
    public KanbanBean(String statusName){
        this.statusName = statusName;
        this.tasks = new ArrayList<>();
    }

    public void addTask(Task task){
        tasks.add(task);
    }

    public String getStatusName() {
        return statusName;
    }

    public void setStatusName(String statusName) {
        this.statusName = statusName;
    }

    public List<Task> getTasks(){
        return tasks;
    }
}
