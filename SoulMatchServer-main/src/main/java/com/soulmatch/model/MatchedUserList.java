package com.soulmatch.model;

import java.util.ArrayList;
import java.util.List;

public class MatchedUserList {

    private List<String> users;

    public MatchedUserList(List<String> users) {
        this.users = users;
    }

    public MatchedUserList() {
        this(new ArrayList<>());
    }

    public List<String> getUsers() {
        return users;
    }

    public void setUsers(List<String> users) {
        this.users = users;
    }
}