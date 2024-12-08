package com.company.sample_app_sql.service;

import com.company.sample_app_sql.entity.Feedback;
import com.company.sample_app_sql.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    public Feedback createFeedback(Feedback feedback) {
        feedback.setFeedbackId(null);
        return feedbackRepository.save(feedback);
    }

    public Optional<Feedback> getFeedbackById(Integer feedbackId) {
        return feedbackRepository.findById(feedbackId);
    }

    public Iterable<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }

    public Feedback updateFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public void deleteFeedbackById(Integer feedbackId) {
        feedbackRepository.deleteById(feedbackId);
    }
}
