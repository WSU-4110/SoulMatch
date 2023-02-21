package com.soulmatch.model;

import java.util.ArrayList;
import java.util.List;

public class MatchProfile {

    private List<String> likedUsers;
    private List<String> dislikedUsers;
    private List<String> matchedUsers;

    public MatchProfile() {
        this(new ArrayList<>(), new ArrayList<>());
    }

    public MatchProfile(List<String> likedUsers, List<String> matchedUsers) {
        this.likedUsers = likedUsers;
        this.matchedUsers = matchedUsers;
    }

    public List<String> getLikedUsers() {
        return likedUsers;
    }

    public List<String> getMatchedUsers() {
        return matchedUsers;
    }

    public List<String> getDislikedUsers() {
        return dislikedUsers;
    }

    public void setLikedUsers(List<String> likedUsers) {
        this.likedUsers = likedUsers;
    }

    public void setMatchedUsers(List<String> matchedUsers) {
        this.matchedUsers = matchedUsers;
    }

    public void setDislikedUsers(List<String> dislikedUsers) {
        this.dislikedUsers = dislikedUsers;
    }

    public void addLikedUser(String userId) {
        this.likedUsers.add(userId);
    }

    public void addMatchedUser(String userId) {
        this.matchedUsers.add(userId);
    }

    public void removeLikedUser(String userId) {
        this.likedUsers.remove(userId);
    }

    public void addDislikedUser(String userId) {
        this.dislikedUsers.add(userId);
    }

    public void removeDislikedUser(String userId) {
        this.dislikedUsers.remove(userId);
    }

    public void removeMatchedUser(String userId) {
        this.matchedUsers.remove(userId);
    }
}
