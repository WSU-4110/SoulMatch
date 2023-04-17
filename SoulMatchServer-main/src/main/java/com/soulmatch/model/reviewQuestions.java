package com.soulmatch.model;

public class reviewQuestions {
    String question1;
    String question2;
    String question3;
    String question4;
    String question5;

    public reviewQuestions(String Q1, String Q2, String Q3, String Q4, String Q5){
        this.question1 = Q1;
        this.question2 = Q2;
        this.question3 = Q3;
        this.question4 = Q4;
        this.question5 = Q5;
    }

    public reviewQuestions(){
        this("", "", "", "", "");
    }

    public String getQuestion1() {
        return question1;
    }

    public void setQuestion1(String question1) {
        this.question1 = question1;
    }

    public String getQuestion2() {
        return question2;
    }

    public void setQuestion2(String question2) {
        this.question2 = question2;
    }

    public String getQuestion3() {
        return question3;
    }

    public void setQuestion3(String question3) {
        this.question3 = question3;
    }

    public String getQuestion4() {
        return question4;
    }

    public void setQuestion4(String question4) {
        this.question4 = question4;
    }

    public String getQuestion5() {
        return question5;
    }

    public void setQuestion5(String question5) {
        this.question5 = question5;
    }
}
