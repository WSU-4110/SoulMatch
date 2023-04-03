package com.soulmatch.chat;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Message {
    private String receiverName;
    private String senderName;
    private String message ;
    private String date;
    private Status status;
}

