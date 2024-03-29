package com.soulmatch.authentication;

import com.google.cloud.firestore.DocumentSnapshot;
import com.soulmatch.firebase.FirebaseController;
import com.soulmatch.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Base64;
import java.nio.charset.StandardCharsets;

import java.util.concurrent.ExecutionException;

@RestController
public class RegisterController {

    @Autowired
    private FirebaseController controller;

    @RequestMapping(
            value = "/register",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> registerUser(@RequestBody User user) throws InterruptedException, ExecutionException {
        DocumentSnapshot snapshot = controller.getFirestore().collection("users").whereEqualTo("email", user.getEmail())
                .get().get()
                .getDocuments()
                .stream()
                .findFirst()
                .orElse(null);

        if (snapshot != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } else {

            //ENCRYPTS THE PASSWORD WHEN THE ACCOUNT REGISTERS
            byte[] encodedPassword = Base64.getEncoder().encode(user.getPassword().getBytes());
            String setEncodedPassword = new String(encodedPassword);
            user.setPassword(setEncodedPassword);

            user.setNewUser(true);
            controller.getFirestore().collection("users").add(user);
            return ResponseEntity.ok(user);
        }
    }
}