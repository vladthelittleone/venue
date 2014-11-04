package com.venue.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * package: com.venue.web.controllers
 * date: 27.04.14
 *
 * Controller responding for redirection.
 *
 * @author Skurishin Vladislav
 */
@Controller
@RequestMapping("/*")
public class WebController
{
    @RequestMapping
    public String getMainPage()
    {
        return "index";
    }

    @RequestMapping("/profileLayout")
    public String getProfilePage()
    {
        return "profile";
    }

    @RequestMapping("/signInLayout")
    public String getSignInPage()
    {
        return "signin";
    }

    @RequestMapping("/signUpLayout")
    public String getSignUpPage()
    {
        return "signup";
    }

    @RequestMapping("/eventLayout")
    public String getEventPage()
    {
        return "event";
    }

}
