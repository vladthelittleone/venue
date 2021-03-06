package com.venue.web.service.domain;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;


/**
 * package: com.venue.web.service.domain
 * date: 23.06.14
 *
 * Class that contains all information about event types.
 *
 * @author Skurishin Vladislav
 */
@JsonSerialize(using = EventType.Serializer.class)
public enum EventType
{
    Music("#8177b4", "music"),
    Sport("#6eba4f", "soccer"),
    Science("#ff881a", "college"),
    Friendship("#ff4444", "heart");

    private String color;
    private String icon;

    EventType(String color, String icon)
    {
        this.color = color;
        this.icon = icon;
    }

    public String getColor()
    {
        return color;
    }

    public String getIcon()
    {
        return icon;
    }

    public static boolean contains(String value)
    {
        for (EventType type : EventType.values())
        {
            if (type.name().equals(value))
            {
                return true;
            }
        }
        return false;
    }

    /**
     * Custom serialization of class.
     */
    static class Serializer extends JsonSerializer<EventType>
    {
        public void serialize
                (EventType value, JsonGenerator generator, SerializerProvider provider)
                throws IOException, JsonProcessingException
        {
            generator.writeStartObject();
            generator.writeFieldName("name");
            generator.writeString(value.name());
            generator.writeFieldName("color");
            generator.writeString(value.getColor());
            generator.writeFieldName("icon");
            generator.writeString(value.getIcon());
            generator.writeEndObject();
        }
    }
}