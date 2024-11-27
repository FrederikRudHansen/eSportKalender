package org.example.esportkalendereks.repository;

import org.example.esportkalendereks.model.Player;
import org.example.esportkalendereks.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepo extends JpaRepository<Player, Long> {
    Player findByEmail(String email); // Finder spiller baseret på e-mail
}
