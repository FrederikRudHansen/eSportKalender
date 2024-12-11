package org.example.esportkalendereks.repository;

import org.example.esportkalendereks.model.Hold;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HoldRepository extends JpaRepository<Hold, Integer> {
}
