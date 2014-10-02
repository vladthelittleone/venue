package com.sprinkle.web.service;

import java.util.Collection;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import com.sprinkle.web.common.exception.IllegalEventProperties;
import com.sprinkle.web.service.domain.Event;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

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
    public Event create(double longitude, double latitude, String title, String description, String size, String type) throws IllegalEventProperties
    {
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

    @Override
    public Event getEvent(Long id)
    {
        if (logger.isTraceEnabled())
            logger.trace(String.format("Get event [%d]", id));

        return events.get(id);
    }
}
