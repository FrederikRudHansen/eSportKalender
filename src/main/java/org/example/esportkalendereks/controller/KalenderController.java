package org.example.esportkalendereks.controller;

import org.example.esportkalendereks.service.KalenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class KalenderController {

    @GetMapping("/kalender")
    public String kalender() {
        return "kalender";
    }
}
