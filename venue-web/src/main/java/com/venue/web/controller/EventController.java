package com.venue.web.controller;

import java.util.Collection;

import com.venue.web.common.exception.IllegalEventProperties;
import com.venue.web.common.validator.EventValidator;
import com.venue.web.security.domain.json.AuthenticationStatus;
import com.venue.web.service.EventService;
import com.venue.web.service.domain.Event;
import com.venue.web.service.domain.EventType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * package: com.venue.web.controller
 * date: 04.11.14
 *
 * Контроллер, предоставляющий методы для работы с объектом {@link com.venue.web.service.EventService}.
 *
 * @author Skurishin Vladislav
 */
@Controller
@RequestMapping("/eventService")
public class EventController
{
    @Autowired
    private EventValidator validator;

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
     * @see com.venue.web.service.EventService
     */
    @RequestMapping(value = "/createEvent", method = RequestMethod.POST)
    @ResponseBody
    public AuthenticationStatus createEvent(@RequestParam Double lng,
                                            @RequestParam Double lat,
                                            @RequestParam String title,
                                            @RequestParam String description,
                                            @RequestParam String size,
                                            @RequestParam String type)
    {
        try
        {
            validator.validate(lng, lat, title, description, size, type);
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
     * @see com.venue.web.service.EventService
     * @see com.venue.web.service.domain.Event
     */
    @RequestMapping("events.geojson")
    @ResponseBody
    public Collection<Event> getEvents()
    {
        return eventService.getEvents();
    }

    /**
     * @return event with given id from event service in GeoJSON format.
     * @param id - event id
     * @see com.venue.web.service.EventService
     * @see com.venue.web.service.domain.Event
     */
    @RequestMapping("event.geojson")
    @ResponseBody
    public Event getEvent(@RequestParam Long id)
    {
        return eventService.getEvent(id);
    }

    /**
     * @return JSON array of strings. Each string is a name of type.
     * @see com.venue.web.service.domain.EventType
     */
    @RequestMapping("types.json")
    @ResponseBody
    public EventType[] getTypes()
    {
        return EventType.values();
    }
}
