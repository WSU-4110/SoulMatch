package com.soulmatch.firebase;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.soulmatch.Utils.UserUtils;
import com.soulmatch.model.User;
import jakarta.annotation.PostConstruct;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.ExecutionException;

@Controller
public class FirebaseController {

    private Firestore firestore;
    private FirebaseApp firebaseApp;

    @PostConstruct
    public void init() {
        try {
            FileInputStream serviceAccount = new FileInputStream("./firebaseCredentials.json");
            GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(credentials)
                    .build();

            FirestoreOptions firestoreOptions = FirestoreOptions.newBuilder()
                    .setCredentials(credentials)
                    .setProjectId("soulmatch-d1c16")
                    .build();

            this.firebaseApp = FirebaseApp.initializeApp(options);
            this.firestore = firestoreOptions.getService();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public FirebaseApp getFirebaseApp() {
        return firebaseApp;
    }

    public Firestore getFirestore() {
        return firestore;
    }

    public User updateUser(User user) {
        if (user == null) return null;

        User databaseUser = getUserByEmail(user.getEmail());
        if (databaseUser != null) {
            if (!user.getFirstName().equals(databaseUser.getFirstName()) && !user.getFirstName().isEmpty()) {
                databaseUser.setFirstName(user.getFirstName());
            }

            if (!user.getLastName().equals(databaseUser.getLastName()) && !user.getLastName().isEmpty()) {
                databaseUser.setLastName(user.getLastName());
            }

            if (!user.getPassword().equals(databaseUser.getPassword()) && !user.getPassword().isEmpty()) {
                databaseUser.setPassword(user.getPassword());
            }

            if (!user.getBirthday().equals(databaseUser.getBirthday()) && !user.getBirthday().isEmpty()) {
                databaseUser.setBirthday(user.getBirthday());
            }

            databaseUser.setProfile(user.getProfile());
            databaseUser.setMatchProfile(user.getMatchProfile());

            getFirestore().collection("users").add(databaseUser);
            return user;
        }

        return null;
    }

    public User getUserByEmail(String email) {
        try {
            DocumentSnapshot snapshot = firestore.collection("users").whereEqualTo("email", email)
                    .get().get()
                    .getDocuments()
                    .stream()
                    .findFirst()
                    .orElse(null);

            if (snapshot != null) {
                return UserUtils.convertToUser(snapshot);
            } else {
                return null;
            }
        } catch (InterruptedException | ExecutionException e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    public User getUserById(String id) {
        try {
            DocumentSnapshot snapshot = firestore.collection("users").whereEqualTo("id", id)
                    .get().get()
                    .getDocuments()
                    .stream()
                    .findFirst()
                    .orElse(null);

            if (snapshot != null) {
                return UserUtils.convertToUser(snapshot);
            } else {
                return null;
            }
        } catch (InterruptedException | ExecutionException e) {
            System.out.println(e.getMessage());
            return null;
        }

    }
}
