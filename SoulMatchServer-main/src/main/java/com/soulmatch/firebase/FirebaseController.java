package com.soulmatch.firebase;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

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
}
