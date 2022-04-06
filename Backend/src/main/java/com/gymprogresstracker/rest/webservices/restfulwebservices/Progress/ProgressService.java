package com.gymprogresstracker.rest.webservices.restfulwebservices.Progress;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgressService {

    @Autowired
    private ProgressRepository progressRepository;

    public List<Progress> getAllProgress(String username) {
        return progressRepository.findByUsername(username);
    }

    public Progress getProgress(String username, long day) {
        return progressRepository.findById(day).get();
    }

    public void updateProgress(String username, long day, Progress progress) {
        progress.setUsername(username);
        progressRepository.save(progress);
    }

    public void addProgress(String username, Progress progress) {
        progress.setUsername(username);
        progressRepository.save(progress);
    }
}
