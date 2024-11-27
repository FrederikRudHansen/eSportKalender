package org.example.esportkalendereks.controller;

import org.springframework.web.bind.annotation.GetMapping;

public class myController {

    @GetMapping("/") //VIRKER IKKE IDK WHY
    public String forside() {
        return "forside.html";
    }
}