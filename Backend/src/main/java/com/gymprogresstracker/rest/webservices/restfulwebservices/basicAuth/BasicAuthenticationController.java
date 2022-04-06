package com.gymprogresstracker.rest.webservices.restfulwebservices.basicAuth;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class BasicAuthenticationController {

    @GetMapping("/basicauth")
    public String basicAuth() {
        return "You are authenticated.";
    }

}
