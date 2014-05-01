package com.sprinkle.web.controllers;

import com.sprinkle.web.security.domain.User;
import com.sprinkle.web.security.service.manager.UserManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.math.BigDecimal;
import java.security.Principal;

/**
 * package: com.sprinkle.web.controllers
 * date: 27.04.14
 *
 * @author Skurishin Vladislav
 */
@Controller
@RequestMapping("/")
public class WebController
{
    private Logger logger = Logger.getLogger(WebController.class);

    @Autowired
    private UserManager userManager;

    /**
     * Sign up new user
     *
     * @param login    user login
     * @param password user password
     * @param name user full name
     * @return OK (200) or BAD REQUEST
     */
    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> singUp(@RequestParam String login,
                                         @RequestParam String name,
                                         @RequestParam String password)
    {
        if (userManager.signUp(login, name, password) == null) return
                new ResponseEntity<>("E-mail already exist", HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

    @RequestMapping(value = "/setmarket", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> setMarket(@RequestParam Double lng,
                                            @RequestParam Double lat,
                                            @RequestParam String title,
                                            @RequestParam String description,
                                            @RequestParam String size,
                                            @RequestParam String color,
                                            @RequestParam String type)
    {
        logger.debug(lng + " " + lat + " " + title + " " + description + " " + size + " " + color + " " + type);
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

    public void setUserManager(UserManager userManager)
    {
        this.userManager = userManager;
    }
}
