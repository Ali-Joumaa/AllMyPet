package com.myallpet.myallpet.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotificationsDTO {
    private Long notificationId;
    private String body;
    private String createdAt;
}
