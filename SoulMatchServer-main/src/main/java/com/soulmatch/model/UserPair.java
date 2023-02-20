package com.soulmatch.model;

public class UserPair {

    //The user id of the user who did the liking
    private String userId;

    //The user id of the user who got liked
    private String likedUserId;

    public UserPair() {
        this("", "");
    }

    public UserPair(String userId, String likedUserId) {
        this.userId = userId;
        this.likedUserId = likedUserId;
    }

    public String getUserId() {
        return userId;
    }

    public String getLikedUserId() {
        return likedUserId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setLikedUserId(String likedUserId) {
        this.likedUserId = likedUserId;
    }
}
