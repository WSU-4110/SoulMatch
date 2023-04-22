package com.soulmatch.model;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MessageTest {

    Message message1;
    @BeforeEach
    void setUp() {
        message1 = new Message("Sam", "Mark", "Yo", "01/01/2001", Status.MESSAGE);
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void getSenderName() {
        String actual = message1.getSenderName();
        String expected = "Sam";

        assertEquals(expected, actual);
    }

    @Test
    void getReceiverName() {
        String actual = message1.getReceiverName();
        String expected = "Mark";

        assertEquals(expected, actual);
    }

    @Test
    void getMessage() {
        String actual = message1.getMessage();
        String expected = "Yo";

        assertEquals(expected, actual);
    }

    @Test
    void getDate() {
        String actual = message1.getDate();
        String expected = "01/01/2001";

        assertEquals(expected, actual);
    }

    @Test
    void getStatus() {
        Status actual = message1.getStatus();
        String expected = "MESSAGE";

        assertEquals(expected, actual.toString());
    }

    @Test
    void setSenderName() {
        message1.setSenderName("Max");
        String actual = message1.getSenderName();
        String expected = "Max";

        assertEquals(expected, actual);
    }
}