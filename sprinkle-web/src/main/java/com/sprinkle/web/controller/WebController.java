package com.sprinkle.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * package: com.sprinkle.web.controllers
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
        return "/profile/index";
    }

    @RequestMapping("/createEventLayout")
    public String getNewEventPage()
    {
        return "/create/event/index";
    }

    @RequestMapping("/signInLayout")
    public String getSignInPage()
    {
        return "/authentication/signin/index";
    }

    @RequestMapping("/signUpLayout")
    public String getSignUpPage()
    {
        return "/authentication/signup/index";
    }

    @RequestMapping("/eventLayout")
    public String getEventPage()
    {
        return "/event/index";
    }

}
