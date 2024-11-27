package org.example.esportkalendereks.repository;

import org.example.esportkalendereks.model.Begivenheder;
import org.example.esportkalendereks.model.Hold;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BegivenhederRepository extends JpaRepository<Begivenheder, Integer> {
    List<Begivenheder> findByHold(Hold hold); // Find events for a specific Hold
}
