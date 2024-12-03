package org.example.esportkalendereks.controller;

import org.example.esportkalendereks.model.Begivenheder;
import org.example.esportkalendereks.service.BegivenhederService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calendar")
public class KalenderController {

    @Autowired
    private BegivenhederService begivenhederService;

    // Endepunkt for at hente begivenheder for et specifikt hold
    @GetMapping("/{holdId}")
    public List<Begivenheder> getEventsForTeam(@PathVariable Long holdId) {
        return begivenhederService.findByHoldId(holdId);
    }
}
