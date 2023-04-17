package com.soulmatch.model;

import java.util.ArrayList;
import java.util.List;

public class Profile {

    private String gender;
    private String bio;
    private String picture;
    private List<String> hobbies;
    private List<String> profilePictures;
    private int score; // variable that holds the AI score on a scale from 1-10
    private String reviewAns1;
    private String reviewAns2;
    private String reviewAns3;
    private String reviewAns4;
    private String reviewAns5;


    public Profile() {
        this("", "", "", new ArrayList<>(), new ArrayList<>(), 0, "", "", "", "", "");
    }

    public Profile(String gender, String bio, String picture, List<String> profilePictures, List<String> hobbies, int score, String reviewAns1, String reviewAns2, String reviewAns3, String reviewAns4, String reviewAns5) {
        this.gender = gender;
        this.bio = bio;
        this.picture = picture;
        this.profilePictures = profilePictures;
        this.hobbies = hobbies;
        this.score = score;
        this.reviewAns1 = reviewAns1;
        this.reviewAns2 = reviewAns2;
        this.reviewAns3 = reviewAns3;
        this.reviewAns4 = reviewAns4;
        this.reviewAns5 = reviewAns5;
    }

    public String getGender() { return gender; }

    public String getBio() { return bio; }

    public String getPicture() { return picture; }

    public List<String> getProfilePictures() { return profilePictures; }

    public List<String> getHobbies() { return hobbies; }

    public int getScore() { return score; }

    public String getReviewAns1() { return reviewAns1; }

    public String getReviewAns2() { return reviewAns2; }

    public String getReviewAns3() { return reviewAns3; }

    public String getReviewAns4() { return reviewAns4; }

    public String getReviewAns5() { return reviewAns5; }

    public void setGender(String gender) { this.gender = gender; }

    public void setBio(String bio) { this.bio = bio; }

    public void setPicture(String picture) { this.picture = picture; }

    public void setProfilePictures(List<String> profilePictures) { this.profilePictures = profilePictures; }

    public void addProfilePicture(String picture) { this.profilePictures.add(picture); }

    public void removeProfilePicture(String picture) { this.profilePictures.remove(picture); }

    public void setHobbies(List<String> hobbies) { this.hobbies = hobbies; }

    public void addHobby(String hobby) { this.hobbies.add(hobby); }

    public void removeHobby(String hobby) { this.hobbies.remove(hobby); }

    public void setScore(int score) { this.score = score; }

    public void setReviewAns1(String reviewAns1) { this.reviewAns1 = reviewAns1; }

    public void setReviewAns2(String reviewAns2) { this.reviewAns2 = reviewAns2; }

    public void setReviewAns3(String reviewAns3) { this.reviewAns3 = reviewAns3; }

    public void setReviewAns4(String reviewAns4) { this.reviewAns4 = reviewAns4; }

    public void setReviewAns5(String reviewAns5) { this.reviewAns5 = reviewAns5; }

}
