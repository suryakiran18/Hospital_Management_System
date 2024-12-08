package com.company.sample_app_sql.controller;

import com.company.sample_app_sql.entity.Feedback;
import com.company.sample_app_sql.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    // Create a new feedback
    @PostMapping("/create")
    public ResponseEntity<Feedback> createFeedback(@RequestBody Feedback feedback) {
        Feedback createdFeedback = feedbackService.createFeedback(feedback);
        return new ResponseEntity<>(createdFeedback, HttpStatus.CREATED);
    }

    // Get feedback by ID
    @GetMapping("/{feedbackId}")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable Integer feedbackId) {
        Optional<Feedback> feedback = feedbackService.getFeedbackById(feedbackId);
        return feedback.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Get all feedbacks
    @GetMapping("/all")
    public ResponseEntity<Iterable<Feedback>> getAllFeedbacks() {
        Iterable<Feedback> feedbacks = feedbackService.getAllFeedbacks();
        return new ResponseEntity<>(feedbacks, HttpStatus.OK);
    }

    // Update feedback
    @PutMapping("/update/{feedbackId}")
    public ResponseEntity<Feedback> updateFeedback(@PathVariable Integer feedbackId, @RequestBody Feedback feedback) {
        if (!feedbackService.getFeedbackById(feedbackId).isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        feedback.setFeedbackId(feedbackId);
        Feedback updatedFeedback = feedbackService.updateFeedback(feedback);
        return new ResponseEntity<>(updatedFeedback, HttpStatus.OK);
    }

    // Delete feedback by ID
    @DeleteMapping("/delete/{feedbackId}")
    public ResponseEntity<String> deleteFeedbackById(@PathVariable Integer feedbackId) {
        if (!feedbackService.getFeedbackById(feedbackId).isPresent()) {
            return new ResponseEntity<>("Feedback not found", HttpStatus.NOT_FOUND);
        }
        feedbackService.deleteFeedbackById(feedbackId);
        return new ResponseEntity<>("Feedback deleted successfully", HttpStatus.OK);
    }
}
