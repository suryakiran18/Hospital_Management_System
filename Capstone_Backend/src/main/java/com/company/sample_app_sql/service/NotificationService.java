package com.company.sample_app_sql.service;

import com.company.sample_app_sql.entity.Notification;
import com.company.sample_app_sql.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public void createNotification(Notification notification) {
        notificationRepository.save(notification);
    }
}
