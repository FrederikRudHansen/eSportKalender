package org.example.esportkalendereks.repository;

import org.example.esportkalendereks.model.Begivenheder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BegivenhederRepository extends JpaRepository<Begivenheder, Integer> {
    List<Begivenheder> findByHoldId(int holdId);
}
