package com.myallpet.myallpet.Repository;

import java.util.List;

// import javax.management.Notification;
// import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.myallpet.myallpet.Models.Notifications;

public interface NotificationRepository extends JpaRepository<Notifications, Long> {
  List<Notifications> findByUser_UserId(Long userId);


}
 
