package com.srsyduts.srsyduts_backend;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*") // Prevents browser CORS blocks 
@RestController // Tell spring that this accepts http requests

public class HelloController { // Maps this method to: http://localhost:8080/api/hello 
    @GetMapping("/api/public/hello") // Where the request comes from
    public String sayHello() { 
        return "Hello World from Spring Boot! Public method"; 
    } 

    @GetMapping("/api/hello")
    public String sayHelloPrivate() {
        return "This is a private helloworld!";
    }
}
