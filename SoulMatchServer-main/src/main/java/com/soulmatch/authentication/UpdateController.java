package com.soulmatch.authentication;

import com.google.cloud.firestore.DocumentSnapshot;
import com.soulmatch.firebase.FirebaseController;
import com.soulmatch.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
public class UpdateController {

    @Autowired
    private FirebaseController controller;

    @RequestMapping(
            value = "/update",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> registerUser(@RequestBody User user) throws InterruptedException, ExecutionException {
            controller.getFirestore().collection("users").add(user);
            return ResponseEntity.ok(user);
    }
}