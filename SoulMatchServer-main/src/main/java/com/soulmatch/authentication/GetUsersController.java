package com.soulmatch.authentication;

import com.google.gson.GsonBuilder;
import com.soulmatch.Utils.UserUtils;
import com.soulmatch.firebase.FirebaseController;
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
public class GetUsersController {

    @Autowired
    private FirebaseController controller;

    @RequestMapping(
            value = "/users",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> getUsersByProfile(@RequestBody User user) {
        user = controller.getUserByEmail(user.getEmail());
        List<User> compatibleUsers = new ArrayList<>();
        for (User user1 : controller.getUsers().values()) {

            if (UserUtils.doUsersProfileMatch(user, user1)) {
                User u = new User();
                u.setId(user1.getId());
                u.setFirstName(user1.getFirstName());
                u.setLastName(user1.getLastName());
                u.setProfile(user1.getProfile());
                compatibleUsers.add(u);
            }
        }

        return ResponseEntity.ok(compatibleUsers);
    }
}
