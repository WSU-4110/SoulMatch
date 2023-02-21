package com.soulmatch.model;

public class UserPair {

    //The user id of the user who did the liking
    private String userId;

    //The user id of the user who got liked
    private String likedUserId;

    //Can be "liked" or "disliked"
    private String type;

    public UserPair() {
        this("liked", "", "");
    }

    public UserPair(String type, String userId, String likedUserId) {
        this.type = type;
        this.userId = userId;
        this.likedUserId = likedUserId;
    }

    public String getUserId() {
        return userId;
    }

    public String getLikedUserId() {
        return likedUserId;
    }

    public String getType() {
        return type;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setLikedUserId(String likedUserId) {
        this.likedUserId = likedUserId;
    }

    public void setType(String type) {
        this.type = type;
    }
}
