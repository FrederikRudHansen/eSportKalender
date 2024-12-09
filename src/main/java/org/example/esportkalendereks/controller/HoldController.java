package org.example.esportkalendereks.controller;

import org.example.esportkalendereks.model.Hold;
import org.example.esportkalendereks.service.HoldService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
                           @RequestParam(required = false) String resume,
                           Model model) {
        Hold hold = new Hold();
        hold.setNavn(navn);
        hold.setRank(rank);
        hold.setNationalitet(nationalitet);
        hold.setAntal(antal);
        // Add resume if provided
        if (resume != null) {
            // Assuming Hold has a setResume method for this example
            hold.setResume(resume);
        }
        holdService.saveHold(hold);

        // Add a success message to the model
        model.addAttribute("message", "Holdet er oprettet!");
        return "redirect:/seHold";
    }

    @GetMapping("/seHold")
    public String seHold() {
        return "seHold";
    }
}
