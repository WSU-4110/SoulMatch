package com.soulmatch.authentication;

import com.google.cloud.firestore.DocumentSnapshot;
import com.soulmatch.firebase.FirebaseController;
import com.soulmatch.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ExecutionException;

@RestController
public class LoginController {

    @Autowired
    private FirebaseController controller;

    @RequestMapping(
            value = "/login",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> loginUser(@RequestBody User user) throws InterruptedException, ExecutionException {
        DocumentSnapshot snapshot = controller.getFirestore().collection("users").whereEqualTo("email", user.getEmail())
                .get().get()
                .getDocuments()
                .stream()
                .findFirst()
                .orElse(null);

        if (snapshot != null) {
            String password = snapshot.getString("password");

            if (password.equals(user.getPassword())) {
                user.setFirstName(snapshot.getString("firstName"));
                user.setLastName(snapshot.getString("lastName"));
                user.setBirthday(snapshot.getString("birthday"));
                user.setGender(snapshot.getString("gender"));

                //TODO ensure fields are updated if more data is created for them

                return ResponseEntity.ok(user);
            }else {
                return ResponseEntity.badRequest().build();
            }
        }else {
            return ResponseEntity.badRequest().build();
        }
    }
}