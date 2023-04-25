package com.soulmatch.test;

import com.soulmatch.Utils.UserUtils;
import com.soulmatch.model.User;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class UserTest {

    //Test that users profile matches based on scores
    @Test
    public void testMatchUsers() {
        User userA = new User();
        userA.setId("1");
        userA.getProfile().setScore(8);

        User userB = new User();
        userB.setId("2");
        userB.getProfile().setScore(7);

        assertTrue(UserUtils.doUsersProfileMatch(userA, userB));
    }

    //Test that adding a matched user works and exists in the list
    @Test
    public void testMatchingUsers() {
        User userA = new User();
        userA.setId("1");

        User userB = new User();
        userB.setId("2");

        userA.getMatchProfile().addMatchedUser(userB.getId());
        assertTrue(userA.getMatchProfile().getMatchedUsers().contains(userB.getId()));
    }

    //Testing that adding a liked user works and exists in the list
    @Test
    public void testLikingUsers() {
        User userA = new User();
        userA.setId("1");

        User userB = new User();
        userB.setId("2");

        userA.getMatchProfile().addLikedUser(userB.getId());
        assertTrue(userA.getMatchProfile().getLikedUsers().contains(userB.getId()));
    }

    //Testing that disliking a user works and adds it to the list
    @Test
    public void testDislikeUsers() {
        User userA = new User();
        userA.setId("1");

        User userB = new User();
        userB.setId("2");

        userA.getMatchProfile().addDislikedUser(userB.getId());
        assertTrue(userA.getMatchProfile().getDislikedUsers().contains(userB.getId()));
    }

    //Testing that adding hobbies works and it exists in the list
    @Test
    public void testHobbies() {
        User userA = new User();
        userA.setId("1");
        userA.getProfile().addHobby("Some Hobby");

        assertTrue(userA.getProfile().getHobbies().contains("Some Hobby"));
    }

    //Testing that adding profile pictures works and the link exists in the list
    @Test
    public void testProfilePictures() {
        User userA = new User();
        userA.setId("1");
        userA.getProfile().addProfilePicture("http://google.com/");

        assertTrue(userA.getProfile().getProfilePictures().contains("http://google.com/"));
    }
}
