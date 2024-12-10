package org.example.esportkalendereks.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MapController {

    @GetMapping("tipsntricks")
    public String tipsntricks() {
        return "tnt/tipsntricks";
    }

    @GetMapping("dust2")
    public String dust2() {
        return "tnt/dust2";
    }

    @GetMapping("baldurstips")
    public String baldurstips() {
        return "tnt/baldurstips";
    }

    @GetMapping("cstips")
    public String cstips() {
        return "tnt/cstips";
    }
}
