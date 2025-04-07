package com.myallpet.myallpet.Repository;

import com.myallpet.myallpet.Models.Message;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("SELECT m FROM Message m WHERE " +
           "(m.sender.username = :user1 AND m.receiver.username = :user2) OR " +
           "(m.sender.username = :user2 AND m.receiver.username = :user1) " +
           "ORDER BY m.timestamp")
    List<Message> getConversation(@Param("user1") String user1, @Param("user2") String user2);
}
