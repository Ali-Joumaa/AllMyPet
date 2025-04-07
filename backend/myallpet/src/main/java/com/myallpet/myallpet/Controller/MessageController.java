package com.myallpet.myallpet.Controller;

import com.myallpet.myallpet.Models.Message;
import com.myallpet.myallpet.Service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:3000")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping("/{receiver}")
    public ResponseEntity<List<Message>> getMessages(
            @AuthenticationPrincipal UserDetails senderDetails,
            @PathVariable String receiver) {

        String senderUsername = senderDetails.getUsername();
        return ResponseEntity.ok(messageService.getMessages(senderUsername, receiver));
    }

    @PostMapping
    public ResponseEntity<Message> sendMessage(
            @AuthenticationPrincipal UserDetails senderDetails,
            @RequestBody Map<String, String> body) {

        String receiver = body.get("receiver");
        String text = body.get("text");
        String senderUsername = senderDetails.getUsername();

        return ResponseEntity.ok(messageService.sendMessage(senderUsername, receiver, text));
    }
}
