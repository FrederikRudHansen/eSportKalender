package org.example.esportkalendereks.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MapController {

    @GetMapping("dust2")
    public String dust2() {
        return "tipsntrickshtmler/dust2";
    }
}
