package com.gymprogresstracker.rest.webservices.restfulwebservices.Progress;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class ProgressController {

    @Autowired
    private ProgressService progressService;

    @Autowired
    private ProgressRepository progressRepository;

    @GetMapping("/users/{username}/progresses")
    public List<Progress> getAllProgress(@PathVariable String username) {
        return progressService.getAllProgress(username);
    }

    @GetMapping("/users/{username}/progresses/{day}")
    public Progress getProgress(@PathVariable String username, @PathVariable long day) {
        return progressService.getProgress(username, day);
    }

    @PutMapping("/users/{username}/progresses/{day}")
    public void updateProgress(@PathVariable String username, @PathVariable long day, @RequestBody Progress progress) {
        progressService.updateProgress(username, day, progress);
    }

    @PostMapping("/users/{username}/progresses")
    public void addProgress(@PathVariable String username, @RequestBody Progress progress) {
        progressService.addProgress(username, progress);
    }
}
