package org.example.esportkalendereks.controller;

import org.example.esportkalendereks.model.Coach;
import org.example.esportkalendereks.service.CoachService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class CoachController {

    @Autowired
    private CoachService coachService; // Service, der håndterer databasekald

    @PostMapping("/registerCoach")
    public String registerCoach(@RequestParam String email, @RequestParam String password, Model model) {
        // Tjek om coachen allerede eksisterer i databasen
        if (coachService.isCoachExists(email)) {
            model.addAttribute("error", "Denne email er allerede registreret.");
            return "registerCoach"; // Bliv på registreringssiden hvis coachen findes
        }

        Coach newCoach = new Coach();
        newCoach.setEmail(email);
        newCoach.setPassword(password);

        coachService.saveCoach(newCoach); // Gem coachen

        return "redirect:/forside"; // Redirect til forsiden efter registrering
    }

    @GetMapping("/registerCoach")
    public String showRegisterForm() {
        return "registerCoach"; // Vis registreringssiden (formular)
    }
}
