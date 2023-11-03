package com.ballast.lane.adonay.test.repositories;

import com.ballast.lane.adonay.test.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByNameEqualsIgnoreCase(String name);
}
