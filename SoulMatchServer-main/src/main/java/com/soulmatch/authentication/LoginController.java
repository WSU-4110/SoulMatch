package com.soulmatch.authentication;

import com.soulmatch.firebase.FirebaseController;
import com.soulmatch.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.Base64;
import java.nio.charset.StandardCharsets;

@RestController
public class LoginController {

    @Autowired
    private FirebaseController controller;

    @RequestMapping(
            value = "/login",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        User databaseUser = controller.getUserByEmail(user.getEmail());

        //DECRYPTS THE INPUT PASSWORD AND COMPARES IT TO THE ONE IN THE DATABASE DURING LOGIN
        String encryptedPass = databaseUser.getPassword();
        byte[] decodedBytes = Base64.getDecoder().decode(encryptedPass);
        String decryptedPass = new String(decodedBytes, StandardCharsets.UTF_8);

        if (databaseUser != null) {
            if (user.getPassword().equals(decryptedPass)) {
                return ResponseEntity.ok(databaseUser);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}