package org.example.esportkalendereks.controller;

import org.example.esportkalendereks.model.Begivenheder;
import org.example.esportkalendereks.service.BegivenhederService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/begivenheder")
public class BegivenhederController {

    private final BegivenhederService begivenhederService;

    public BegivenhederController(BegivenhederService begivenhederService) {
        this.begivenhederService = begivenhederService;
    }

    @PostMapping
    public Begivenheder opretBegivenhed(@RequestBody Begivenheder begivenhed) {
        return begivenhederService.opretBegivenhed(begivenhed);
    }

    @GetMapping("/hold/{holdId}")
    public List<Begivenheder> getBegivenhederForHold(@PathVariable int holdId) {
        return begivenhederService.findByHoldId(holdId);
    }

    @DeleteMapping("/{id}")
    public void sletBegivenhed(@PathVariable int id) {
        begivenhederService.sletBegivenhed(id);
    }
}
