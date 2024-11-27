package org.example.esportkalendereks.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MyController {

    @GetMapping("/") // This will now resolve to the forside.html template
    public String forside() {
        return "forside";
    }
}