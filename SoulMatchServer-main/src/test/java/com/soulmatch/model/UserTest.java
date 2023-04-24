package com.soulmatch.model;
import com.soulmatch.Utils.UserUtils;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {
    //BRENT'S SECTION
    @Test
    public void testConstructor() {
        User user = new User("123", "test@test.com", "password", "Unit", "Test", "01/01/1990", true, new Profile(), new MatchProfile());
        assertEquals("123", user.getId());
        assertEquals("test@test.com", user.getEmail());
        assertEquals("password", user.getPassword());
        assertEquals("Unit", user.getFirstName());
        assertEquals("Test", user.getLastName());
        assertEquals("01/01/1990", user.getBirthday());
        assertTrue(user.isNewUser());
        assertNotNull(user.getProfile());
        assertNotNull(user.getMatchProfile());
    }

    @Test
    public void testDefaultConstructor() {
        User user = new User();
        assertEquals("", user.getId());
        assertEquals("", user.getEmail());
        assertEquals("", user.getPassword());
        assertEquals("", user.getFirstName());
        assertEquals("", user.getLastName());
        assertEquals("", user.getBirthday());
        assertTrue(user.isNewUser());
        assertNotNull(user.getProfile());
        assertNotNull(user.getMatchProfile());
    }

    @Test
    public void testEmail() {
        User user = new User();
        user.setEmail("test@test.com");
        assertEquals("test@test.com", user.getEmail());
    }

    @Test
    public void testPassword() {
        User user = new User();
        user.setPassword("password");
        assertEquals("password", user.getPassword());
    }

    @Test
    public void testFirstName() {
        User user = new User();
        user.setFirstName("Unit");
        assertEquals("Unit", user.getFirstName());
    }

    @Test
    public void testLastName() {
        User user = new User();
        user.setLastName("Test");
        assertEquals("Test", user.getLastName());
    }

    @Test
    public void testBirthday() {
        User user = new User();
        user.setBirthday("01/01/1990");
        assertEquals("01/01/1990", user.getBirthday());
    }

    @Test
    public void testNewUser() {
        User user = new User();
        user.setNewUser(true);
        assertTrue(user.isNewUser());
        user.setNewUser(false);
        assertFalse(user.isNewUser());
    }

    @Test
    public void testProfile() {
        User user = new User();
        Profile profile = new Profile();
        user.setProfile(profile);
        assertEquals(profile, user.getProfile());
    }

    @Test
    public void testMatchProfile() {
        User user = new User();
        MatchProfile matchProfile = new MatchProfile();
        user.setMatchProfile(matchProfile);
        assertEquals(matchProfile, user.getMatchProfile());
    }

    //HADI'S SECTION
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