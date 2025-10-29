// src/hooks/useEarthquakeData.js
import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";

// Map friendly range name to USGS filenames
const FEED_MAP = {
  hour: "all_hour.geojson",
  day: "all_day.geojson",
  week: "all_week.geojson",
  month: "all_month.geojson",
};

export default function useEarthquakeData(range = "day", minMag = 0, pollMs = 600000) {
  const [data, setData] = useState([]); // array of parsed quakes
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pollRef = useRef(null);

  // Wrapped in useCallback so it can safely be a dependency
  const fetchData = useCallback(
    async (signal) => {
      setLoading(true);
      setError(null);
      try {
        const file = FEED_MAP[range] || FEED_MAP.day;
        const url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${file}`;
        const res = await axios.get(url, { signal });
        const features = res.data.features || [];
        const parsed = features
          .map((f) => ({
            id: f.id,
            mag: f.properties.mag ?? 0,
            place: f.properties.place ?? "Unknown",
            time: f.properties.time,
            url: f.properties.url,
            depth: f.geometry.coordinates[2],
            coordinates: [f.geometry.coordinates[1], f.geometry.coordinates[0]], // lat, lng
          }))
          .filter((p) => p.mag >= (minMag || 0));
        setData(parsed);
      } catch (err) {
        if (axios.isCancel?.(err)) return;
        setError(err.message || "Failed to fetch earthquake data");
      } finally {
        setLoading(false);
      }
    },
    [range, minMag] // dependencies for useCallback
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);

    // Polling for real-time updates
    if (pollMs > 0) {
      pollRef.current = setInterval(() => {
        fetchData(); // short poll without abort
      }, pollMs);
    }

    return () => {
      controller.abort();
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [fetchData, pollMs]); // include fetchData

  // manual refresh
  const refresh = () => fetchData();

  return { data, loading, error, refresh };
}
