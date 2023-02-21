package com.soulmatch.firebase;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;
import com.google.cloud.firestore.QueryDocumentSnapshot;
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
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@Controller
public class FirebaseController {

    private Firestore firestore;
    private FirebaseApp firebaseApp;

    private final Map<String, User> users = new HashMap<>();

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

            for (QueryDocumentSnapshot document : firestore.collection("users").get().get().getDocuments()) {
                User user = UserUtils.convertToUser(document);
                users.put(user.getEmail(), user);
            }

            firestore.collection("users").addSnapshotListener((value, error) -> {
                if (value == null) return;

                for (QueryDocumentSnapshot document : value.getDocuments()) {
                    User user = UserUtils.convertToUser(document);
                    users.put(user.getEmail(), user);
                }
            });
        } catch (IOException | ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    public FirebaseApp getFirebaseApp() {
        return firebaseApp;
    }

    public Firestore getFirestore() {
        return firestore;
    }

    public void cacheUser(User user) {
        this.users.put(user.getEmail(), user);
    }

    public User updateUser(User user) {
        if (user == null) return null;

        String id = getDocumentId(user.getEmail());
        User databaseUser = getUserByEmail(user.getEmail());

        if (databaseUser != null) {
            user.setId(databaseUser.getId());
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

            if (databaseUser.getProfile().getHobbies().size() > 0) {
                databaseUser.setNewUser(false);
            }

            getFirestore().collection("users").document(id).set(databaseUser);

            this.users.put(databaseUser.getEmail(), databaseUser);
            return databaseUser;
        }

        return null;
    }

    public String getDocumentId(String email) {
        try {
            DocumentSnapshot snapshot = firestore.collection("users").whereEqualTo("email", email)
                    .get().get()
                    .getDocuments()
                    .stream()
                    .findFirst()
                    .orElse(null);

            if (snapshot != null) {
                return snapshot.getId();
            } else {
                return null;
            }
        } catch (InterruptedException | ExecutionException e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    public User getUserByEmail(String email) {
        if (users.containsKey(email)) {
            return users.get(email);
        }

        try {
            DocumentSnapshot snapshot = firestore.collection("users").whereEqualTo("email", email)
                    .get().get()
                    .getDocuments()
                    .stream()
                    .findFirst()
                    .orElse(null);

            if (snapshot != null) {
                User user = UserUtils.convertToUser(snapshot);
                users.put(user.getEmail(), user);
                return user;
            } else {
                return null;
            }
        } catch (InterruptedException | ExecutionException e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    public User getUserById(String id) {
        Optional<User> optionalUser = users.values().stream().filter(user -> user.getId().equals(id)).findFirst();
        if (optionalUser.isPresent()) {
            return optionalUser.get();
        }

        try {
            DocumentSnapshot snapshot = firestore.collection("users").whereEqualTo("id", id)
                    .get().get()
                    .getDocuments()
                    .stream()
                    .findFirst()
                    .orElse(null);

            if (snapshot != null) {
                User user = UserUtils.convertToUser(snapshot);
                users.put(user.getEmail(), user);
                return user;
            } else {
                return null;
            }
        } catch (InterruptedException | ExecutionException e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    public Map<String, User> getUsers() {
        return users;
    }
}
