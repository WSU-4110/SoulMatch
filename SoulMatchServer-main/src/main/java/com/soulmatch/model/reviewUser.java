package com.soulmatch.model;

public class reviewUser {
    String reviewerID;
    String reviewedID;

    reviewQuestions questions;

    public reviewUser(String reviewerID, String reviewedID, reviewQuestions questions){
        this.reviewerID = reviewerID;
        this.reviewedID = reviewedID;
        this.questions = questions;

    }

    public reviewUser(String reviewerID, String reviewedID){
        this(reviewerID, reviewedID, new reviewQuestions());
    }

    public reviewUser(){
        this("", "");
    }

    public String getReviewerID() {
        return reviewerID;
    }

    public void setReviewerID(String reviewerID) {
        this.reviewerID = reviewerID;
    }

    public String getReviewedID() {
        return reviewedID;
    }

    public void setReviewedID(String reviewedID) {
        this.reviewedID = reviewedID;
    }

    public reviewQuestions getQuestions() {
        return questions;
    }

    public void setQuestions(reviewQuestions questions) {
        this.questions = questions;
    }
}
