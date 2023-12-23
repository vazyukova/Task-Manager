package com.vkr.tms.payload;

import com.vkr.tms.payload.StatusBean;

import java.util.List;

public class WorkflowSchemaBean {
    private int id;
    private String name;
    private List<StatusBean> statusBeans;

    public WorkflowSchemaBean(int id, String name, List<StatusBean> statusBeans) {
        this.id = id;
        this.name = name;
        this.statusBeans = statusBeans;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<StatusBean> getStatusBeans() {
        return statusBeans;
    }

    public void setStatusBeans(List<StatusBean> statusBeans) {
        this.statusBeans = statusBeans;
    }
}
