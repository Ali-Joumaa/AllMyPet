package com.myallpet.myallpet.Service;

import com.myallpet.myallpet.Models.*;
import com.myallpet.myallpet.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepo;

    @Autowired
    private UserRepository userRepo;

    public List<Message> getMessages(String user1, String user2) {
        return messageRepo.getConversation(user1, user2);
    }

    public Message sendMessage(String senderUsername, String receiverUsername, String text) {
        User sender = userRepo.findByUsername(senderUsername)
                        .orElseThrow(() -> new RuntimeException("Sender not found"));
        User receiver = userRepo.findByUsername(receiverUsername)
                        .orElseThrow(() -> new RuntimeException("Receiver not found"));

        Message msg = new Message(null, sender, receiver, text, LocalDateTime.now());
        return messageRepo.save(msg);
    }
}
