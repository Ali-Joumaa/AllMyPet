package com.myallpet.myallpet.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myallpet.myallpet.Models.Notifications;
import com.myallpet.myallpet.Repository.NotificationRepository;

@Service
public class NotificationService {
    
    @Autowired
    private NotificationRepository notificationRepository;

    public void saveNotification(Notifications notification){
        notificationRepository.save(notification);
    }
    
}

