package org.example.esportkalendereks.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class myController {

    @GetMapping("/forside") // This will now resolve to the forside.html template
    public String forside() {
        return "forside";
    }

    @GetMapping("/tips") // This will now resolve to the forside.html template
    public String tips() {
        return "tips";
    }

    @GetMapping("/minprofil") // This will now resolve to the forside.html template
    public String minprofil() {
        return "minprofil";
    }
}
