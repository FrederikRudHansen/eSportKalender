package org.example.esportkalendereks.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MyController {

    @GetMapping("/forside")
    public String forside() {
        return "forside";
    }

    @GetMapping("/minprofil")
    public String minprofil() {
        return "minprofil";
    }

    @GetMapping("/leaguetips")
    public String leaguetips() {
        return "leaguetips";
    }

    @GetMapping("/csgotips")
    public String csgotips() {
        return "csgotips";
    }

    @GetMapping("/baldurstips")
    public String baldurstips() {
        return "baldurstips";
    }

}