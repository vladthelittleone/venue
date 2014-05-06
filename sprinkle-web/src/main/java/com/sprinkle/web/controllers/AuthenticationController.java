package com.sprinkle.web.controllers;

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

/**
 * package: com.sprinkle.web.controllers
 * date: 06.05.14
 *
 * @author Skurishin Vladislav
 */
@Controller
@RequestMapping("/authentication")
public class AuthenticationController
{
    private Logger logger = Logger.getLogger(AuthenticationController.class);

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
    @RequestMapping(value = "/authentication/signup", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> singUp(@RequestParam String login,
                                         @RequestParam String name,
                                         @RequestParam String password)
    {
        if (userManager.signUp(login, name, password) == null) return
                new ResponseEntity<>("E-mail already exist", HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

    @RequestMapping
    public String getAuthenticationPage() {
        logger.debug("Get authentication page");
        return "/authentication/index";
    }

    public void setUserManager(UserManager userManager)
    {
        this.userManager = userManager;
    }

}
