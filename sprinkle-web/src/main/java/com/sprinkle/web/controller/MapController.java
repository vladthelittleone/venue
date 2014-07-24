package com.sprinkle.web.controller;

import com.sprinkle.web.common.exception.IllegalEventProperties;
import com.sprinkle.web.security.domain.json.AuthenticationStatus;
import com.sprinkle.web.service.domain.Event;
import com.sprinkle.web.service.domain.EventType;
import com.sprinkle.web.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Collection;

/**
 * package: com.sprinkle.web.controllers
 * date: 09.05.14
 *
 * Controller responding for map.
 * Provides functions for events, types, etc.
 *
 * @author Skurishin Vladislav
 */
@Controller
@RequestMapping("/map")
public class MapController
{
    @Autowired
    private EventService eventService;

    /**
     * Add event to event manager.
     *
     * @param lng         - longitude.
     * @param lat         - latitude.
     * @param title       - title of event.
     * @param description - description of event.
     * @param size        - size of event.
     * @param type        - type of event.
     * @return authentication status
     * @see com.sprinkle.web.service.EventService
     */
    @RequestMapping(value = "/setevent", method = RequestMethod.POST)
    @ResponseBody
    public AuthenticationStatus setEvent(@RequestParam Double lng,
                                         @RequestParam Double lat,
                                         @RequestParam String title,
                                         @RequestParam String description,
                                         @RequestParam String size,
                                         @RequestParam String type)
    {
        try
        {
            eventService.create(lng, lat, title, description, size, type);
            return new AuthenticationStatus(true, null, true);
        }
        catch (IllegalEventProperties e)
        {
            // Catch exception about incorrect event properties
            return new AuthenticationStatus(true, null, e.getMessage(), false);

        }
    }

    /**
     * @return all events from event service in GeoJSON format.
     * @see com.sprinkle.web.service.EventService
     * @see com.sprinkle.web.service.domain.Event
     */
    @RequestMapping("events.geojson")
    @ResponseBody
    public Collection<Event> getEvents()
    {
        return eventService.getEvents();
    }

    /**
     * @return JSON array of strings. Each string is a name of type.
     * @see com.sprinkle.web.service.domain.EventType
     */
    @RequestMapping("types.json")
    @ResponseBody
    public EventType[] getTypes()
    {
        return EventType.values();
    }
}
