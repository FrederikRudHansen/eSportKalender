package org.example.esportkalendereks.service;

import org.example.esportkalendereks.model.Begivenheder;
import org.example.esportkalendereks.repository.BegivenhederRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BegivenhederService {

    private final BegivenhederRepository begivenhederRepository;

    public BegivenhederService(BegivenhederRepository begivenhederRepository) {
        this.begivenhederRepository = begivenhederRepository;
    }

    // Find begivenheder baseret på holdId
    public List<Begivenheder> findByHoldId(Long holdId) {
        return begivenhederRepository.findByHold_HoldID(holdId);
    }

    public Begivenheder opretBegivenhed(Begivenheder begivenhed) {
        return begivenhederRepository.save(begivenhed);
    }

    public void sletBegivenhed(int id) {
        begivenhederRepository.deleteById(id);
    }
}
