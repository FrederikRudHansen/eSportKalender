package org.example.esportkalendereks.service;

import org.example.esportkalendereks.model.Begivenheder;
import org.example.esportkalendereks.model.Hold;
import org.example.esportkalendereks.repository.BegivenhederRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BegivenhederService {

    private final BegivenhederRepository begivenhederRepository;

    public BegivenhederService(BegivenhederRepository begivenhederRepository) {
        this.begivenhederRepository = begivenhederRepository;
    }

    public Begivenheder opretBegivenhed(Begivenheder begivenhed) {
        return begivenhederRepository.save(begivenhed);
    }

    public List<Begivenheder> findByHold(Hold hold) {
        return begivenhederRepository.findByHold(hold);
    }

    public void sletBegivenhed(int id) {
        begivenhederRepository.deleteById(id);
    }
}
