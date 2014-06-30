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

    @RequestMapping("/profile")
    public String getProfilePage()
    {
        return "/profile/index";
    }

    @RequestMapping("/newevent")
    public String getNewEventPage()
    {
        return "/new/event/index";
    }

    @RequestMapping("/authentication")
    public String getAuthenticationPage()
    {
        return "/authentication/index";
    }

}
