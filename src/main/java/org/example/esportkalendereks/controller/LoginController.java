package org.example.esportkalendereks.controller;

import org.example.esportkalendereks.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LoginController {

    @Autowired
    private PlayerService PlayerService; // Service, der håndterer databasekald

    @PostMapping("/login")
    public String login(@RequestParam String email, @RequestParam String password, Model model) {
        // Tjek om spilleren findes i databasen med den angivne email og password
        if (PlayerService.validatePlayer(email, password)) {
            // Hvis login er korrekt, omdiriger til forsiden
            return "redirect:/forside";
        } else {
            // Hvis login ikke er korrekt, vis fejlmeddelelse og bliv på login-siden
            model.addAttribute("error", "Ugyldigt login. Prøv igen.");
            return "login"; // Vis login-siden igen
        }
    }

    @GetMapping("/login")
    public String loginForm() {
        return "login"; // Returner login-siden, hvis der er en GET-anmodning
    }
}
