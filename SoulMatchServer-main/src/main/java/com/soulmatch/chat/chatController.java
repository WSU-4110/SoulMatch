package com.soulmatch.chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.simp.SimpMessagingTemplate;


@Controller
public class chatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/message")
    private Message receiveMessage(@Payload Message message){
        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(),"/private", message);
        return message;
    }
}
