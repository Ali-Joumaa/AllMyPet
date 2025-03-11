package com.myallpet.myallpet.Repository;

import java.util.List;

import javax.management.Notification;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.myallpet.myallpet.Models.Notifications;

public interface NotificationRepository extends JpaRepository<Notifications, Long> {
  List<Notification> findByUserId(Long userId);

  // Optionally, retrieve notifications based on their read/unread status
  List<Notification> findByUserIdAndStatus(Long userId, String status);
}
 
