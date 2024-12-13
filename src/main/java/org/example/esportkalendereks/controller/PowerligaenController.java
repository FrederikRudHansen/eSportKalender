package org.example.esportkalendereks.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PowerligaenController {

    @GetMapping("/powerligaen")
    public String powerligaen() {
        return "powerligaen";
    }
}
