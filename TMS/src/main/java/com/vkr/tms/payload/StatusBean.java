package com.vkr.tms.payload;

import com.vkr.tms.model.Status;

public class StatusBean {
    private Status status;
    private int ordering;

    public StatusBean(Status status, int ordering) {
        this.status = status;
        this.ordering = ordering;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public int getOrdering() {
        return ordering;
    }

    public void setOrdering(int ordering) {
        this.ordering = ordering;
    }
}
