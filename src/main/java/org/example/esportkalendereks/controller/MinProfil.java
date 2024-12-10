package org.example.esportkalendereks.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MinProfil {

    @GetMapping("/minProfil")
    public String minProfil(HttpSession session) {
        return "minProfil";
    }
}

