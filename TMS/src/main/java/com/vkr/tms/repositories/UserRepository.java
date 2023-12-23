package com.vkr.tms.repositories;

import com.vkr.tms.model.Usr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Usr, Integer> {
    Usr getUserByUsername(String username);
    Optional<Usr> findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);

}
