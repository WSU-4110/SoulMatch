package com.soulmatch.model;

public class User {

    private String id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String birthday;
    private boolean newUser;
    private Profile profile;
    private MatchProfile matchProfile;

    public User() {
        this("", "", "", "", "", true);
    }

    public User(String id, String email, String password, String firstName, String lastName, String birthday, boolean newUser, Profile profile, MatchProfile matchProfile) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.newUser = newUser;
        this.profile = profile;
        this.matchProfile = matchProfile;
    }

    public User(String email, String password, String firstName, String lastName, String birthday, boolean newUser) {
        this("", email, password, firstName, lastName, birthday, newUser, new Profile(), new MatchProfile());
    }

    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() { return password; }

    public String getFirstName() { return firstName; }

    public String getLastName() { return lastName; }

    public String getBirthday() { return birthday; }

    public boolean isNewUser() { return newUser; }

    public Profile getProfile() { return profile; }

    public MatchProfile getMatchProfile() { return matchProfile; }

    public void setId(String id) { this.id = id; }

    public void setEmail(String email) { this.email = email; }

    public void setPassword(String password) { this.password = password;}

    public void setFirstName(String firstName) { this.firstName = firstName; }

    public void setLastName(String lastName) { this.lastName = lastName; }

    public void setBirthday(String birthday) { this.birthday = birthday; }

    public void setNewUser(boolean newUser) { this.newUser = newUser; }

    public void setProfile(Profile profile) { this.profile = profile; }

    public void setMatchProfile(MatchProfile matchProfile) { this.matchProfile = matchProfile; }
}