package com.soulmatch.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class UserTest {

    @Test
    public void testConstructor() {
        User user = new User("123", "test@test.com", "password", "John", "Doe", "01/01/1990", true, new Profile(), new MatchProfile());
        assertEquals("123", user.getId());
        assertEquals("test@test.com", user.getEmail());
        assertEquals("password", user.getPassword());
        assertEquals("John", user.getFirstName());
        assertEquals("Doe", user.getLastName());
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
        user.setFirstName("John");
        assertEquals("John", user.getFirstName());
    }

    @Test
    public void testLastName() {
        User user = new User();
        user.setLastName("Doe");
        assertEquals("Doe", user.getLastName());
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
}