package com.soulmatch.authentication;

import com.soulmatch.ai.AIController;
import com.soulmatch.firebase.FirebaseController;
import com.soulmatch.model.User;
import com.soulmatch.model.reviewUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class reviewUsersController {

    @Autowired
    private FirebaseController controller;

    @RequestMapping(
            value = "/review",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> reviewUser(@RequestBody reviewUser reviewUser) {
        if(reviewUser.getReviewerID() != null && reviewUser.getReviewedID() != null){
            User reviewedUser = controller.getUserById(reviewUser.getReviewedID());
            reviewedUser.getProfile().setReviewAns1(reviewUser.getQuestions().getQuestion1());
            reviewedUser.getProfile().setReviewAns2(reviewUser.getQuestions().getQuestion2());
            reviewedUser.getProfile().setReviewAns3(reviewUser.getQuestions().getQuestion3());
            reviewedUser.getProfile().setReviewAns4(reviewUser.getQuestions().getQuestion4());
            reviewedUser.getProfile().setReviewAns5(reviewUser.getQuestions().getQuestion5());

            controller.updateUser(reviewedUser);
            return ResponseEntity.ok("Review Successful");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
