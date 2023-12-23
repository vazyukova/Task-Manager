package com.vkr.tms.payload;

import com.vkr.tms.model.Usr;

public class UserBean {
    private String username;
    private String password;
    private String email;
    private String displayName;
    private String role;

    public UserBean(String username, String password, String email, String displayName, String role) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.displayName = displayName;
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
