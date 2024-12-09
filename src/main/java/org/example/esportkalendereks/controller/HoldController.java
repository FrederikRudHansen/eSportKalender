package org.example.esportkalendereks.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HoldController {

    @GetMapping("/oprethold")
    public String opretHold(HttpSession session) {
        return "opretHold";
    }

    @GetMapping("/seHold")
    public String seHold(HttpSession session) {
        return "seHold";
    }
}
