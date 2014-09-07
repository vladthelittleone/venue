package com.sprinkle.web.service;

import com.sprinkle.web.common.exception.IllegalEventProperties;
import com.sprinkle.web.service.domain.Event;

import java.util.Collection;

/**
 * package: com.sprinkle.web.service
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
     * @see com.sprinkle.web.service.domain.Event
     */
    public Event create(double longitude,
                        double latitude,
                        String title,
                        String description,
                        String size,
                        String type) throws IllegalEventProperties;

    /**
     * @return all events from event service in GeoJSON format.
     * @see com.sprinkle.web.service.domain.Event
     */
    public Collection<Event> getEvents();
}
