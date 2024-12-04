package org.example.esportkalendereks.controller;

import jakarta.servlet.http.HttpSession;
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
    private PlayerService playerService;

    @PostMapping("/login")
    public String login(@RequestParam String email, @RequestParam String password, Model model, HttpSession session) {

        // Admin-login
        if ("admin@admin".equals(email) && "admin".equals(password)) {
            session.setAttribute("userRole", "admin");
            return "redirect:/admin";
        }

        if (playerService.validatePlayer(email, password)) {
            session.setAttribute("userRole", "user");
            return "redirect:/forside";
        } else {
            model.addAttribute("error", "Ugyldigt login. Prøv igen.");
            return "login";
        }
    }

    @GetMapping("/login")
    public String loginForm() {
        return "login";
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/forside";
    }
}
