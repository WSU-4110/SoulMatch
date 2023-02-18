package com.soulmatch.model;

import java.util.UUID;

public class User {

    private UUID uuid;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String birthday;
    private String gender;

    public User() {
        this("", "", "", "", "", "");
    }

    public User(UUID uuid, String email, String password, String firstName, String lastName, String birthday, String gender) {
        this.uuid = uuid;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.gender = gender;
    }

    public User(String email, String password, String firstName, String lastName, String birthday, String gender) {
        this(UUID.randomUUID(), email, password, firstName, lastName, birthday, gender);
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getBirthday() {
        return birthday;
    }

    public String getGender() {
        return gender;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
