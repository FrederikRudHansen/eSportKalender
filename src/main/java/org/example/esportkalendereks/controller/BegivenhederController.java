package org.example.esportkalendereks.controller;

import org.example.esportkalendereks.model.Begivenheder;
import org.example.esportkalendereks.model.Hold;
import org.example.esportkalendereks.service.BegivenhederService;
import org.example.esportkalendereks.service.HoldService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/begivenheder")
public class BegivenhederController {

    private final BegivenhederService begivenhederService;
    private final HoldService holdService;

    public BegivenhederController(BegivenhederService begivenhederService, HoldService holdService) {
        this.begivenhederService = begivenhederService;
        this.holdService = holdService;
    }

    @PostMapping
    public Begivenheder opretBegivenhed(@RequestBody Begivenheder begivenhed) {
        return begivenhederService.opretBegivenhed(begivenhed);
    }

    @GetMapping("/hold/{holdId}")
    public List<Begivenheder> getBegivenhederForHold(@PathVariable int holdId) {
        Hold hold = holdService.findById(holdId); // Find Hold by ID
        return begivenhederService.findByHold(hold); // Find events for the specific hold
    }

    @DeleteMapping("/{id}")
    public void sletBegivenhed(@PathVariable int id) {
        begivenhederService.sletBegivenhed(id);
    }
}
