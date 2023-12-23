package com.vkr.tms.model;

import org.springframework.security.core.GrantedAuthority;

public enum ERole implements GrantedAuthority {
    USER,
    ADMIN;

    @Override
    public String getAuthority() {
        return name();
    }
}
