package org.example.esportkalendereks.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TurneringController {
    @GetMapping("/elgiganten")
    public String elgiganten(HttpSession session) {
        return "elgiganten";
    }
    @GetMapping("/turnering")
    public String turnering(HttpSession session) {
        return "turnering";
    }
    @GetMapping("/powerligaen")
    public String powerligaen(HttpSession session) {
        return "powerligaen";
    }
}
