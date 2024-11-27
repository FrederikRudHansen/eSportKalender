package org.example.esportkalendereks.repository;

import jakarta.persistence.Id;
import org.example.esportkalendereks.model.Coach;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoachRepo extends JpaRepository<Coach, Long> {
    Coach findByEmail(String email); // Finder coach baseret på email
}
