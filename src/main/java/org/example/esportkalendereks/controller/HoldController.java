package org.example.esportkalendereks.controller;

import org.example.esportkalendereks.model.Hold;
import org.example.esportkalendereks.service.HoldService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class HoldController {
    private final HoldService holdService;

    public HoldController(HoldService holdService) {
        this.holdService = holdService;
    }

    @GetMapping("/oprethold")
    public String opretHold() {
        return "oprethold";
    }

    @PostMapping("/oprethold")
    public String saveHold(@RequestParam String navn,
                           @RequestParam String rank,
                           @RequestParam String nationalitet,
                           @RequestParam int antal,
                           @RequestParam List<String> spil,
                           @RequestParam(required = false) String resume,
                           Model model) {
        Hold hold = new Hold();
        hold.setNavn(navn);
        hold.setRank(rank);
        hold.setNationalitet(nationalitet);
        hold.setAntal(antal);
        hold.setSpil(String.join(", ", spil));
        if (resume != null) {
            hold.setResume(resume);
        }
        holdService.saveHold(hold);

        model.addAttribute("message", "Holdet er oprettet!");
        return "redirect:/seHold";
    }

    @GetMapping("/seHold")
    public String seHold(Model model) {
        List<Hold> holdListe = holdService.findAll(); // Henter alle hold fra databasen
        model.addAttribute("holdListe", holdListe); // Gør listen tilgængelig for Thymeleaf
        return "seHold"; // Returnerer visningen "seHold.html"
    }

}
