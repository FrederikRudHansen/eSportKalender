package org.example.esportkalendereks.controller;

import org.example.esportkalendereks.model.Player;
import org.example.esportkalendereks.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class RegisterController {

    @Autowired
    private PlayerService playerService; // Service, der håndterer databasekald

    // GET metode til at vise registreringsformularen
    @GetMapping("/register")
    public String registerForm() {
        return "register"; // Returnerer register.html
    }

    // POST metode til at oprette spilleren
    @PostMapping("/register")
    public String register(@RequestParam String email, @RequestParam String password, Model model) {
        // Tjek om spilleren allerede eksisterer i databasen
        if (playerService.isPlayerExists(email)) {
            model.addAttribute("error", "Denne email er allerede registreret.");
            return "register"; // Hvis emailen er registreret, vis fejl og forbliv på registreringssiden
        }

        Player newPlayer = new Player();
        newPlayer.setEmail(email);
        newPlayer.setPassword(password);
        playerService.savePlayer(newPlayer);  // Gem den nye spiller

        return "redirect:/forside";  // Redirect til forsiden
    }
}
