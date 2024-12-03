package org.example.esportkalendereks.repository;

import org.example.esportkalendereks.model.Begivenheder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BegivenhederRepository extends JpaRepository<Begivenheder, Integer> {
    // Find begivenheder ved hjælp af holdets ID
    List<Begivenheder> findByHold_HoldID(Long holdId);
}
