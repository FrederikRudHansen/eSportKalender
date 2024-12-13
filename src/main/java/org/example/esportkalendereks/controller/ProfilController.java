package org.example.esportkalendereks.controller;

import jakarta.servlet.http.HttpSession;
import org.example.esportkalendereks.model.Hold;
import org.example.esportkalendereks.service.HoldService;
import org.example.esportkalendereks.service.PlayerService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class ProfilController {

    private final HoldService holdService;

    public ProfilController(HoldService holdService, PlayerService playerService) {
        this.holdService = holdService;
    }

    @GetMapping("/profil")
    public String profil(HttpSession session, Model model) {
        List<Hold> holdListe = holdService.findAll();
        System.out.println("Hold Liste: " + holdListe); // Logger holdene for at sikre, at de findes
        model.addAttribute("holdListe", holdListe);
        return "profil";
    }

}