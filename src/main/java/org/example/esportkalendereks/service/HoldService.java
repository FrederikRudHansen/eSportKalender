package org.example.esportkalendereks.service;

import org.example.esportkalendereks.model.Hold;
import org.example.esportkalendereks.repository.HoldRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HoldService {

    private final HoldRepository holdRepository;

    public HoldService(HoldRepository holdRepository) {
        this.holdRepository = holdRepository;
    }

    public Hold findById(int id) {
        return holdRepository.findById(id).orElseThrow(() -> new RuntimeException("Hold not found"));
    }

    public void saveHold(Hold hold) {
        holdRepository.save(hold);
    }

    public List<Hold> findAll() {
        return holdRepository.findAll();
    }
}
