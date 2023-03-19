package com.soulmatch.Utils;

import com.google.cloud.firestore.DocumentSnapshot;
import com.soulmatch.model.MatchProfile;
import com.soulmatch.model.Profile;
import com.soulmatch.model.User;

public class UserUtils {

    public static User convertToUser(DocumentSnapshot snapshot) {
        if (snapshot == null) {
            return null;
        }

        User user = new User();
        user.setEmail(snapshot.getString("email"));
        user.setPassword(snapshot.getString("password"));
        user.setFirstName(snapshot.getString("firstName"));
        user.setLastName(snapshot.getString("lastName"));
        user.setBirthday(snapshot.getString("birthday"));
        user.setNewUser(snapshot.contains("newUser") ? snapshot.getBoolean("newUser") : true);
        user.setId(snapshot.getId());

        if (snapshot.contains("profile")) {
            user.setProfile(snapshot.get("profile", Profile.class));
        }

        if (snapshot.contains("matchProfile")) {
            user.setMatchProfile(snapshot.get("matchProfile", MatchProfile.class));
        }

        return user;
    }

    public static boolean doUsersProfileMatch(User user1, User user2) {
        if (user1 == null || user2 == null) return false;
        if (user1.getId().equals(user2.getId()) ||
                user1.getMatchProfile().getLikedUsers().contains(user2.getId()) ||
                user1.getMatchProfile().getDislikedUsers().contains(user2.getId()) ||
                user1.getMatchProfile().getMatchedUsers().contains(user2.getId())) {
            return false;
        }
        /*
        int matchCount = 0;

        for (String hobby : user1.getProfile().getHobbies()) {
            for (String hobby2 : user2.getProfile().getHobbies()) {
                if (hobby.equals(hobby2)) {
                    matchCount++;
                }
            }
        }
        return matchCount > 0;*/
        if (user2.getProfile().getScore() - user1.getProfile().getScore() >= -2 && user2.getProfile().getScore() - user1.getProfile().getScore() <= 2){
            return true;
        }
        return false;

    }
}
