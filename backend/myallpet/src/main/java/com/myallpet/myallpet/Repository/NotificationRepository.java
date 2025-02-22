package com.myallpet.myallpet.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.myallpet.myallpet.Models.Notifications;

public interface NotificationRepository extends JpaRepository<Notifications, Long> {
}
