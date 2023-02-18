package com.soulmatch.test;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/hello")
    public String test() {
        return "Hello-World";
    }

    @GetMapping("/")
    public String home() {
        return "Welcome Home Page";
    }
}
