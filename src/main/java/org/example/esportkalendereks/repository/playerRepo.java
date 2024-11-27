package org.example.esportkalendereks.repository;

import org.example.esportkalendereks.model.player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface playerRepo extends JpaRepository<player, Long> {
    player findByEmail(String email); // Finder spiller baseret på e-mail
}
