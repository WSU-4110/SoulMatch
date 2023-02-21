package com.soulmatch.authentication;

import com.soulmatch.firebase.FirebaseController;
import com.soulmatch.model.User;
import com.soulmatch.model.UserPair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MatchingController {

    @Autowired
    private FirebaseController controller;

    @RequestMapping(
            value = "/matching",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> matchUsers(@RequestBody UserPair userPair) {
        User user1 = controller.getUserById(userPair.getUserId());
        User user2 = controller.getUserById(userPair.getLikedUserId());

        if (user1 != null && user2 != null) {

            if (userPair.getType().equals("liked")) {
                boolean match = user2.getMatchProfile().getLikedUsers().contains(user1.getId());

                if (match) {
                    user1.getMatchProfile().addMatchedUser(user2.getId());
                    user2.getMatchProfile().addMatchedUser(user1.getId());
                    user2.getMatchProfile().removeLikedUser(user1.getId());

                    controller.updateUser(user1);
                    controller.updateUser(user2);
                } else {
                    user1.getMatchProfile().addLikedUser(user2.getId());
                    controller.updateUser(user1);
                }
            }else {
                user1.getMatchProfile().addDislikedUser(user2.getId());
                controller.updateUser(user1);
            }

            return ResponseEntity.ok(user1);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
