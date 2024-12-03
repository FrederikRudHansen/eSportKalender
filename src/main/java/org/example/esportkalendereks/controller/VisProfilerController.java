package org.example.esportkalendereks.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class VisProfilerController {

    @GetMapping("/visProfiler")
    public String visProfiler(HttpSession session) {
        return "visProfiler";
    }
}

