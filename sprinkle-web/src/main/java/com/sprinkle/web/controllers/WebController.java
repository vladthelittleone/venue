package com.sprinkle.web.controllers;

import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * package: com.sprinkle.web.controllers
 * date: 27.04.14
 *
 * @author Skurishin Vladislav
 */
@Controller
@RequestMapping("/*")
public class WebController
{
    private Logger logger = Logger.getLogger(WebController.class);

    @RequestMapping
    public String getMainPage()
    {
        logger.debug("Get index page");
        return "index";
    }

    @RequestMapping ("/profile")
    public String getProfilePage()
    {
        return "/profile/index";
    }

    @RequestMapping ("/newevent")
    public String getNewEventPage() {
        return "/profile/new/event/index";
    }

    @RequestMapping ("/authentication")
    public String getAuthenticationPage()
    {
        return "/authentication/index";
    }

}
