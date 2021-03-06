package com.venue.web.service.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * package: com.venue.web.service.domain
 * date: 23.06.14
 *
 * Class that contains all information about event.
 * Structure of class corresponds to GeoJSon format.
 * GeoJSon format is using for MapBox feature layer.
 * See the official documentation of GeoJSon.
 *
 * @author Skurishin Vladislav
 */
public class Event
{
    private String type = "Feature";
    private Geometry geometry;
    private Properties properties;

    @JsonIgnore
    public Event(long eventId, double longitude, double latitude, String title, String description, String size, String type)
    {
        this.geometry = new Geometry("Point", new double[]{longitude, latitude});
        this.properties = new Properties(eventId, title, description, size, type);
    }

    public String getType()
    {
        return type;
    }

    public void setType(String type)
    {
        this.type = type;
    }

    public Geometry getGeometry()
    {
        return geometry;
    }

    public void setGeometry(Geometry geometry)
    {
        this.geometry = geometry;
    }

    public Properties getProperties()
    {
        return properties;
    }

    public void setProperties(Properties properties)
    {
        this.properties = properties;
    }

    static class Properties
    {
        private long eventId;
        private String title;
        private String description;
        private String type;

        @JsonProperty("marker-size")
        private String markerSize;

        @JsonProperty("marker-color")
        private String markerColor;

        @JsonProperty("marker-symbol")
        private String markerSymbol;

        @JsonIgnore
        Properties(long eventId, String title, String description, String markerSize, String type)
        {
            // Get type properties
            EventType p = EventType.valueOf(type);

            this.type = type;
            this.eventId = eventId;
            this.title = title;
            this.description = description;
            this.markerSize = markerSize;
            this.markerColor = p.getColor();
            this.markerSymbol = p.getIcon();
        }

        public String getTitle()
        {
            return title;
        }

        public void setTitle(String title)
        {
            this.title = title;
        }

        public String getDescription()
        {
            return description;
        }

        public void setDescription(String description)
        {
            this.description = description;
        }

        public String getMarkerSize()
        {
            return markerSize;
        }

        public void setMarkerSize(String markerSize)
        {
            this.markerSize = markerSize;
        }

        public String getMarkerColor()
        {
            return markerColor;
        }

        public void setMarkerColor(String markerColor)
        {
            this.markerColor = markerColor;
        }

        public String getMarkerSymbol()
        {
            return markerSymbol;
        }

        public void setMarkerSymbol(String markerSymbol)
        {
            this.markerSymbol = markerSymbol;
        }

        public long getEventId()
        {
            return eventId;
        }

        public void setEventId(long eventId)
        {
            this.eventId = eventId;
        }

        public String getType()
        {
            return type;
        }

        public void setType(String type)
        {
            this.type = type;
        }
    }

    static class Geometry
    {
        private String type;
        private double[] coordinates = new double[2];

        @JsonIgnore
        Geometry(String type, double[] coordinates)
        {
            this.type = type;
            this.coordinates = coordinates;
        }

        public String getType()
        {
            return type;
        }

        public void setType(String type)
        {
            this.type = type;
        }

        public double[] getCoordinates()
        {
            return coordinates;
        }

        public void setCoordinates(double[] coordinates)
        {
            this.coordinates = coordinates;
        }
    }
}