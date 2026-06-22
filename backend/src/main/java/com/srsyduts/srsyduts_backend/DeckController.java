package com.srsyduts.srsyduts_backend;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*") // Prevents browser CORS blocks 
@RestController // Tell spring that this accepts http requests
public class DeckController {
    @PostMapping("/api/getBatch") // Where the request comes from
    public String getBatch() { 
        // Queries the database for all user cards that are due, uses user id as param
        return "Hello World from Spring Boot! Public method"; 
    } 

    @PostMapping("/api/getNew")
    public void getNew() {
        // Queries database for new cards, uses user id as param

    }


    @PostMapping("/api/checkAnswer")
    public String checkAnswer() {
        // Queries database, then checks if user answer is correct. 
        // return answer, along with corrections.
        return null;
    }
}
