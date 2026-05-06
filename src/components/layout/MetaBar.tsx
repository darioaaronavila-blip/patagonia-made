"use client";

import { useEffect, useState } from "react";

interface WeatherData {
  temp: number;
  windspeed: number;
  winddirection: number;
}

function getWindDirection(deg: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
}

function getPuntaArenasTime(): string {
  return new Date().toLocaleTimeString("en-GB", {
    timeZone: "America/Punta_Arenas",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MetaBar() {
  const [time, setTime] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);

  // Clock — updates every 30s
  useEffect(() => {
    setTime(getPuntaArenasTime());
    const interval = setInterval(() => setTime(getPuntaArenasTime()), 30_000);
    return () => clearInterval(interval);
  }, []);

  // Weather — Open-Meteo, free, no key needed, updates every 15min
  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=-53.15&longitude=-70.92&current=temperature_2m,wind_speed_10m,wind_direction_10m&wind_speed_unit=kmh&timezone=America%2FPunta_Arenas",
          { next: { revalidate: 900 } }
        );
        const data = await res.json();
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          windspeed: Math.round(data.current.wind_speed_10m),
          winddirection: data.current.wind_direction_10m,
        });
      } catch {
        // Silently fail — static fallback stays in place
      }
    }
    fetchWeather();
    const interval = setInterval(fetchWeather, 15 * 60_000);
    return () => clearInterval(interval);
  }, []);

  const weatherStr = weather
    ? `${weather.temp}°C · Wind ${weather.windspeed} km/h ${getWindDirection(weather.winddirection)}`
    : "Loading…";

  return (
    <div
      style={{
        background: "var(--ink)",
        color: "var(--paper)",
        padding: "9px var(--gutter)",
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        letterSpacing: "0.08em",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        zIndex: 10,
        flexWrap: "wrap",
        gap: "8px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
        <span className="metabar-coords" style={{ opacity: 0.6 }}>53°09′S — 70°55′W · PUNTA ARENAS</span>
        <span className="metabar-coords" style={{ opacity: 0.3 }}>|</span>
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{
            display: "inline-block", width: "6px", height: "6px", borderRadius: "50%",
            background: "var(--moss)", boxShadow: "0 0 0 2px rgba(74,93,58,0.3)",
            animation: "pulse 2s ease-in-out infinite", flexShrink: 0,
          }} />
          Open Now
        </span>
        <span className="metabar-weather" style={{ opacity: 0.3 }}>|</span>
        {time && <span className="metabar-weather" style={{ opacity: 0.75 }}>{time} local</span>}
        <span className="metabar-weather" style={{ opacity: 0.3 }}>|</span>
        <span className="metabar-weather" style={{ opacity: weather ? 1 : 0.4, transition: "opacity 0.5s" }}>{weatherStr}</span>
        <span className="metabar-delivery" style={{ opacity: 0.3 }}>|</span>
        <span className="metabar-delivery" style={{ opacity: 0.75 }}>Hotel delivery same day before 18:00</span>
      </div>
      <div className="metabar-right">
        <span>3 ships in port</span>
        <span style={{ opacity: 0.4 }}>/</span>
        <span>USD ▾</span>
      </div>
    </div>
  );
}
