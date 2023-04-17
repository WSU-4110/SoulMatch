package com.soulmatch.authentication;

import com.soulmatch.firebase.FirebaseController;
import com.soulmatch.model.MatchedUserList;
import com.soulmatch.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class GetMatchedUsersController {

    @Autowired
    private FirebaseController controller;

    @RequestMapping(
            value = "/matchedusers",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> getMatchedUsers(@RequestBody User user) {
        List<User> users = new ArrayList<>();

        for (String userId: user.getMatchProfile().getMatchedUsers()) {
            User dbUser = controller.getUserById(userId);

            User clientUser = new User();
            clientUser.setId(dbUser.getId());
            clientUser.setProfile(dbUser.getProfile());
            clientUser.setFirstName(dbUser.getFirstName());
            clientUser.setLastName(dbUser.getLastName());
            clientUser.setBirthday(dbUser.getBirthday());

            users.add(clientUser);
        }

        return ResponseEntity.ok(users);
    }
}