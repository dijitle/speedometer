import React, { useEffect, useState } from "react";
import "./App.css";
import { drawCompassNeedle, drawCompassDirection } from "./Compass";
import { drawGPS, drawCoords } from "./GPS";
import { drawArc, drawNeedle, drawLabels, drawDigitalSpeed } from "./Gauge";

function App() {
  const [speed, setSpeed] = useState(0);
  const [speedNeedle, setSpeedNeedle] = useState(0);
  const [compassDir, setCompassDir] = useState(0);
  const [compassDirNeedle, setCompassDirNeedle] = useState(0);
  const [gpsStrength, setGpsStrength] = useState(0);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [gpsError, setGpsError] = useState("");
  const [winSize, setWinSize] = useState({
    w: window.innerWidth,
    h: window.innerHeight
  });

  const draw = () => {
    let canvas = document.getElementById("speedometer");
    let ctx = canvas.getContext("2d");
    ctx.scale(2, 2);

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = Math.min(width - 2, height - 2) * 2;
    canvas.height = Math.min(width - 2, height - 2) * 2;

    let marginY = height / 2 - Math.min(width, height) / 2;
    let marginX = width / 2 - Math.min(width, height) / 2;

    canvas.style =
      "margin-top: " +
      marginY +
      "px; margin-left: " +
      marginX +
      "px; width: " +
      Math.min(width - 2, height - 2) +
      "px; height: " +
      Math.min(width - 2, height - 2);

    var w = canvas.width;

    let startAngle = (3 / 4) * Math.PI;
    let endAngle = (1 / 4) * Math.PI;

    let outerRadius = w / 2.2;
    let innerRadius = w / 5;

    let min = 0;
    let max = 100;
    let intervals = max / 10;

    ctx.lineCap = "round";

    ctx.clearRect(0, 0, w, w);

    ctx.strokeStyle = "#424242";
    ctx.fillStyle = "#ffffff";

    drawArc(ctx, w, w / 20, outerRadius, startAngle, endAngle, false);
    drawArc(ctx, w, w / 50, innerRadius, startAngle, endAngle, true);
    drawLabels(ctx, w, outerRadius, min, max, startAngle, endAngle, intervals);
    drawDigitalSpeed(ctx, w, speed);
    drawGPS(ctx, w, gpsStrength);
    drawCoords(ctx, w, lat, lon);
    drawNeedle(
      ctx,
      w,
      speedNeedle,
      min,
      max,
      startAngle,
      endAngle,
      innerRadius,
      outerRadius
    );
    drawCompassDirection(ctx, w, compassDir);
    drawCompassNeedle(ctx, w, compassDirNeedle);

    let increment = 0.4;

    if (speedNeedle < speed) {
      if (speed - speedNeedle < increment) {
        setSpeedNeedle(speed);
      } else {
        setSpeedNeedle(speedNeedle + increment);
      }
    } else {
      if (speedNeedle - speed < increment) {
        setSpeedNeedle(speed);
      } else {
        setSpeedNeedle(speedNeedle - increment);
      }
    }

    if (compassDirNeedle < compassDir) {
      if (compassDir - compassDirNeedle > 180) {
        setCompassDirNeedle(compassDirNeedle + 360);
      } else if (compassDir - compassDirNeedle < 1) {
        setCompassDirNeedle(compassDir);
      } else {
        setCompassDirNeedle(compassDirNeedle + 1);
      }
    } else {
      if (compassDirNeedle - compassDir > 180) {
        setCompassDirNeedle(compassDirNeedle - 360);
      } else if (compassDirNeedle - compassDir < 1) {
        setCompassDirNeedle(compassDir);
      } else {
        setCompassDirNeedle(compassDirNeedle - 1);
      }
    }
  };

  useEffect(() => {
    const handleResize = () =>
      setWinSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", handleResize);

    const watchPos = ({ coords }) => {
      setLat(coords.latitude);
      setLon(coords.longitude);
      setGpsStrength(Math.round(coords.accuracy));
      setCompassDir(coords.heading === null ? 0 : coords.heading);
      setSpeed(coords.speed === null ? 0 : coords.speed * 2.23694);
    };

    const watchPosError = err => {
      setGpsError(err.message);
    };

    let options = {
      enableHighAccuracy: false,
      timeout: 60000,
      maximumAge: 0
    };
    let id = navigator.geolocation.watchPosition(
      watchPos,
      watchPosError,
      options
    );

    return () => {
      navigator.geolocation.clearWatch(id);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let id = window.requestAnimationFrame(draw);
    return () => window.cancelAnimationFrame(id);
  }, [
    speed,
    speedNeedle,
    compassDir,
    compassDirNeedle,
    gpsStrength,
    lat,
    lon,
    winSize
  ]);

  return (
    <div className="container-fluid">
      <canvas id="speedometer"></canvas>
      <div style={{ color: "#ff0000" }}>{gpsError}</div>
    </div>
  );
}

export default App;
