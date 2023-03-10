package com.soulmatch.model;

import java.util.ArrayList;
import java.util.List;

public class Profile {

    private String gender;
    private String bio;
    private String picture;
    private List<String> hobbies;
    private List<String> profilePictures;

    public Profile() {
        this("", "", "", new ArrayList<>(), new ArrayList<>());
    }

    public Profile(String gender, String bio, String picture, List<String> profilePictures, List<String> hobbies) {
        this.gender = gender;
        this.bio = bio;
        this.picture = picture;
        this.profilePictures = profilePictures;
        this.hobbies = hobbies;
    }

    public String getGender() {
        return gender;
    }

    public String getBio() {
        return bio;
    }

    public String getPicture() {
        return picture;
    }

    public List<String> getProfilePictures() {
        return profilePictures;
    }

    public List<String> getHobbies() {
        return hobbies;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public void setProfilePictures(List<String> profilePictures) {
        this.profilePictures = profilePictures;
    }

    public void addProfilePicture(String picture) {
        this.profilePictures.add(picture);
    }

    public void removeProfilePicture(String picture) {
        this.profilePictures.remove(picture);
    }

    public void setHobbies(List<String> hobbies) {
        this.hobbies = hobbies;
    }

    public void addHobby(String hobby) {
        this.hobbies.add(hobby);
    }

    public void removeHobby(String hobby) {
        this.hobbies.remove(hobby);
    }
}
