import React, { useEffect, useState } from "react";
import "./App.css";
import { drawCompass } from "./Compass";
import { drawGPS, drawCoords } from "./GPS";
import { drawArc, drawNeedle, drawLabels, drawDigitalSpeed } from "./Gauge";

function App() {
  const [value, setValue] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);

  let draw = () => {
    let canvas = document.getElementById("speedometer");
    let ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = Math.min(width, height);
    canvas.height = Math.min(width, height);

    let marginY = height / 2 - Math.min(width, height) / 2;
    let marginX = width / 2 - Math.min(width, height) / 2;

    canvas.style =
      "margin-top: " + marginY + "px; margin-left: " + marginX + "px";

    var w = canvas.width;

    let startAngle = (3 / 4) * Math.PI;
    let endAngle = (1 / 4) * Math.PI;

    let outerRadius = w / 2.2;
    let innerRadius = w / 5;

    let min = 0;
    let max = 60;
    let intervals = max / 10;

    ctx.lineCap = "round";

    ctx.clearRect(0, 0, w, w);
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#000000";

    drawArc(ctx, w, w / 20, outerRadius, startAngle, endAngle, false);
    drawArc(ctx, w, w / 50, innerRadius, startAngle, endAngle, true);
    drawLabels(ctx, w, outerRadius, min, max, startAngle, endAngle, intervals);
    drawDigitalSpeed(ctx, w, value);
    drawGPS(ctx, w, 60 - value);
    drawCoords(ctx, w, 41.234211, -89.481513);
    drawNeedle(
      ctx,
      w,
      value,
      min,
      max,
      startAngle,
      endAngle,
      innerRadius,
      outerRadius
    );
    drawCompass(ctx, w, value * 6);

    window.requestAnimationFrame(draw);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setValue(new Date().getSeconds());
    }, 1000);
    window.requestAnimationFrame(draw);
    return () => clearInterval(intervalId);
  }, [value]);

  return (
    <div className="container-fluid">
      <canvas id="speedometer"></canvas>
    </div>
  );
}

export default App;
