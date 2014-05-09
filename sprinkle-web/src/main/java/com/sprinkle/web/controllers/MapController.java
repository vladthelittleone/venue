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
 * date: 09.05.14
 *
 * @author Skurishin Vladislav
 */
@Controller
@RequestMapping("/map")
public class MapController
{
    private Logger logger = Logger.getLogger(MapController.class);

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
        logger.debug(String.format("Set market [%f, %f, %s, %s, %s, %s, %s]", lng, lat, title, description, size, color, type));
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }
}
