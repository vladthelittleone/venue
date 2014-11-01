package com.venue.web.service;

import java.util.Collection;

import com.venue.web.common.exception.IllegalEventProperties;
import com.venue.web.service.domain.Event;

/**
 * package: com.venue.web.service
 * date: 22.06.14
 *
 * @author Skurishin Vladislav
 */
public interface EventService
{
    /**
     * Create new event.
     *
     * @param longitude   - longitude.
     * @param latitude    - latitude.
     * @param title       - title of event.
     * @param description - description of event.
     * @param size        - size of event.
     * @param type        - type of event.
     * @return created event
     * @see com.venue.web.service.domain.Event
     */
    public Event create(double longitude,
                        double latitude,
                        String title,
                        String description,
                        String size,
                        String type) throws IllegalEventProperties;

    /**
     * @return all events from event service in GeoJSON format.
     * @see com.venue.web.service.domain.Event
     */
    public Collection<Event> getEvents();

    /**
     * @return event with given id from event service in GeoJSON format.
     * @see EventService
     * @see com.venue.web.service.domain.Event
     */
    public Event getEvent(Long id);
}
