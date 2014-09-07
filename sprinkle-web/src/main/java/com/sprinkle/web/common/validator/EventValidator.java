package com.sprinkle.web.common.validator;

import com.sprinkle.web.common.exception.IllegalAuthenticationProperties;
import com.sprinkle.web.common.exception.IllegalEventProperties;
import com.sprinkle.web.service.domain.EventType;

/**
 * package: com.sprinkle.web.service.settings
 * date: 23.07.14
 *
 * @author Skurishin Vladislav
 */
public class EventValidator
{
    private short titleLength;
    private int descriptionLength;

    public void validate(double longitude,
                         double latitude,
                         String title,
                         String description,
                         String size,
                         String type)
            throws IllegalEventProperties
    {
        /**
         * Check type contains.
         *
         * @see com.sprinkle.web.service.domain.EventType
         */
        if (!EventType.contains(type))
        {
            throw new IllegalEventProperties("This type of event is not available");
        }

        /**
         * Check longitude entrance.
         */
        if (longitude > 180 || longitude < -180)
        {
            throw new IllegalEventProperties("Illegal map coordinates: longitude");
        }

        /**
         * Check latitude entrance.
         */
        if (latitude > 90 || latitude < -90)
        {
            throw new IllegalEventProperties("Illegal map coordinates: latitude");
        }

        if (title == null)
        {
            throw new IllegalEventProperties("Title can not be null");
        }

        if (description == null)
        {
            throw new IllegalEventProperties("Description can not be null");
        }

        if (type == null)
        {
            throw new IllegalEventProperties("Type can not be null");
        }

        /**
         * Check description length.
         */
        if (description.length() > descriptionLength)
        {
            throw new IllegalEventProperties("Letters limit for description is exceeded");
        }

        /**
         * Check title length.
         */
        if (title.length() > titleLength)
        {
            throw new IllegalEventProperties("Letters limit for title is exceeded");
        }
    }

    public void setTitleLength(short titleLength)
    {
        this.titleLength = titleLength;
    }

    public short getTitleLength()
    {
        return titleLength;
    }

    public int getDescriptionLength()
    {
        return descriptionLength;
    }

    public void setDescriptionLength(int descriptionLength)
    {
        this.descriptionLength = descriptionLength;
    }
}
