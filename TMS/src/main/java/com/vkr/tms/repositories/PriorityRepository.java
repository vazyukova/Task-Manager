package com.vkr.tms.repositories;

import com.vkr.tms.model.Priority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PriorityRepository extends JpaRepository<Priority, Integer> {
    Priority getByName(String name);
}
