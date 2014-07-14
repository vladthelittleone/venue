package com.sprinkle.web.service;

import com.sprinkle.web.service.domain.Event;
import com.sprinkle.web.service.domain.EventType;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

/**
 * package: com.sprinkle.web.service
 * date: 22.06.14
 *
 * @author Skurishin Vladislav
 */
@Service
public class CustomEventService implements EventService
{
    private final Logger logger = Logger.getLogger(CustomEventService.class);

    private final AtomicLong eventId = new AtomicLong(0);
    private final ConcurrentHashMap<Long, Event> events = new ConcurrentHashMap<>();

    @Override
    public Event create(double longitude, double latitude, String title, String description, String size, String type)
    {
        // Validate new event
        if (!validate(longitude, latitude, title, description, type)) return null;

        long id = eventId.incrementAndGet();

        Event event = new Event(id, longitude, latitude, title, description, size, type);

        if (logger.isTraceEnabled())
            logger.trace(String.format("Create new event [%d, %f, %f, %s, %s, %s]",
                    id, longitude, latitude, title, description, type));

        events.put(id, event);

        return event;
    }

    @Override
    public Collection<Event> getEvents()
    {
        return events.values();
    }

    private boolean validate(double longitude, double latitude, String title, String description, String type)
    {
        // Check type
        if (!EventType.contains(type))
            return false;
        if (longitude > 180 || longitude < -180)
            return false;
        if (latitude > 90 || latitude < -90)
            return false;
        if (title == null)
            return false;
        if (description == null)
            return false;
        return type != null;
    }
}
