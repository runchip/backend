package com.runchip.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @RequestMapping("/")
    public String Hello() {
        return "Welcome to RunChip Dashboard!";
    }
}
