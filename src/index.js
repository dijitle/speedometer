import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

function draw() {
  var canvas = document.getElementById("speedometer");
  var ctx = canvas.getContext("2d");

  var w = canvas.width;

  let startAngle = (3 / 4) * Math.PI;
  let endAngle = (1 / 4) * Math.PI;

  let outerRadius = w / 2.2;
  let innerRadius = w / 5;

  let value = new Date().getSeconds();

  let min = 0;
  let max = 60;
  let intervals = max / 10;

  ctx.lineCap = "round";

  ctx.clearRect(0, 0, w, w);
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#000000";

  //outer arc
  ctx.beginPath();
  ctx.arc(w / 2, w / 2, outerRadius, startAngle, endAngle);
  ctx.lineWidth = w / 20;
  ctx.stroke();

  //inner arc
  ctx.beginPath();
  ctx.arc(w / 2, w / 2, innerRadius, startAngle, endAngle);
  ctx.moveTo(
    w / 2 + innerRadius * Math.cos(startAngle),
    w / 2 + innerRadius * Math.sin(startAngle)
  );
  ctx.lineTo(
    w / 2 + innerRadius * Math.cos(endAngle),
    w / 2 + innerRadius * Math.sin(endAngle)
  );
  ctx.lineWidth = w / 50;
  ctx.stroke();

  //labels
  ctx.beginPath();

  for (let i = 0; i <= intervals; i++) {
    let angle =
      (2 * Math.PI - (startAngle - endAngle)) * (i / intervals) + startAngle;
    ctx.moveTo(
      w / 2 + outerRadius * Math.cos(angle),
      w / 2 + outerRadius * Math.sin(angle)
    );
    ctx.lineTo(
      w / 2 + outerRadius * 0.9 * Math.cos(angle),
      w / 2 + outerRadius * 0.9 * Math.sin(angle)
    );
    ctx.font = String(w / 25) + "px monospace";
    let text = String(i * ((max - min) / intervals));
    let textWidth = ctx.measureText(text).width / 2;
    ctx.fillText(
      text,
      w / 2 + outerRadius * 0.8 * Math.cos(angle) - textWidth,
      w / 2 + outerRadius * 0.8 * Math.sin(angle) + w / 100
    );
  }

  ctx.lineWidth = w / 80;
  ctx.stroke();

  //digital gauge
  ctx.lineWidth = w / 50;
  ctx.font = String(w / 8) + "px monospace";
  ctx.fillText(value, w / 2 - ctx.measureText(value).width / 2, w / 2 + w / 4);
  ctx.stroke();

  //needle
  let percentSpeed = value / (max - min);

  let angleOfSpeedometer =
    (2 * Math.PI - (startAngle - endAngle)) * percentSpeed + startAngle;

  ctx.beginPath();
  ctx.strokeStyle = "#FF0000";
  ctx.moveTo(
    w / 2 + innerRadius * 1.075 * Math.cos(angleOfSpeedometer),
    w / 2 + innerRadius * 1.075 * Math.sin(angleOfSpeedometer)
  );
  ctx.lineTo(
    w / 2 + outerRadius * 0.9 * Math.cos(angleOfSpeedometer),
    w / 2 + outerRadius * 0.9 * Math.sin(angleOfSpeedometer)
  );
  ctx.shadowColor = "black";
  ctx.shadowBlur = 15;
  ctx.stroke();

  ctx.shadowBlur = 0;

  //GPS
  let stength = max - value; //meters
  ctx.beginPath();
  ctx.strokeStyle = "#69ff69";
  ctx.fillStyle = "#00ff00";
  ctx.lineWidth = w / 500;
  ctx.arc(w / 2 - w / 15, w / 2 - w / 7, w / 60, 0, 2 * Math.PI);
  if (stength > 100) {
    ctx.stroke();
  } else {
    ctx.fill();
  }

  ctx.beginPath();
  ctx.lineWidth = w / 500;
  ctx.arc(w / 2 - w / 30, w / 2 - w / 7, w / 60, 0, 2 * Math.PI);
  if (stength > 50) {
    ctx.stroke();
  } else {
    ctx.fill();
  }

  ctx.beginPath();
  ctx.lineWidth = w / 500;
  ctx.arc(w / 2, w / 2 - w / 7, w / 60, 0, 2 * Math.PI);
  if (stength > 25) {
    ctx.stroke();
  } else {
    ctx.fill();
  }

  ctx.beginPath();
  ctx.lineWidth = w / 500;
  ctx.arc(w / 2 + w / 30, w / 2 - w / 7, w / 60, 0, 2 * Math.PI);
  if (stength > 10) {
    ctx.stroke();
  } else {
    ctx.fill();
  }

  ctx.beginPath();
  ctx.lineWidth = w / 500;
  ctx.arc(w / 2 + w / 15, w / 2 - w / 7, w / 60, 0, 2 * Math.PI);
  if (stength > 5) {
    ctx.stroke();
  } else {
    ctx.fill();
  }

  ctx.font = String(w / 40) + "px monospace";
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#000000";
  let gpsText = "GPS: +/-" + stength + "m";
  ctx.fillText(
    gpsText,
    w / 2 - ctx.measureText(gpsText).width / 2,
    w / 2 - w / 10
  );

  //compass
  let compassHeading = value * 6;
  let direction = "N";

  if (compassHeading > 11.25 && compassHeading <= 33.75) {
    direction = "NNE";
  } else if (compassHeading > 33.75 && compassHeading <= 56.25) {
    direction = "NE";
  } else if (compassHeading > 56.25 && compassHeading <= 78.75) {
    direction = "ENE";
  } else if (compassHeading > 78.75 && compassHeading <= 101.25) {
    direction = "E";
  } else if (compassHeading > 101.25 && compassHeading <= 123.75) {
    direction = "ESE";
  } else if (compassHeading > 123.75 && compassHeading <= 146.25) {
    direction = "SE";
  } else if (compassHeading > 146.25 && compassHeading <= 168.75) {
    direction = "SSE";
  } else if (compassHeading > 168.75 && compassHeading <= 191.25) {
    direction = "S";
  } else if (compassHeading > 191.25 && compassHeading <= 213.75) {
    direction = "SSW";
  } else if (compassHeading > 213.75 && compassHeading <= 236.25) {
    direction = "SW";
  } else if (compassHeading > 236.25 && compassHeading <= 258.75) {
    direction = "WSW";
  } else if (compassHeading > 258.75 && compassHeading <= 281.25) {
    direction = "W";
  } else if (compassHeading > 281.25 && compassHeading <= 303.75) {
    direction = "WNW";
  } else if (compassHeading > 303.75 && compassHeading <= 326.25) {
    direction = "NW";
  } else if (compassHeading > 326.25 && compassHeading <= 348.75) {
    direction = "NNW";
  }

  ctx.font = String(w / 40) + "px monospace";
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#000000";
  let compassText = direction + " : " + compassHeading + "*";
  ctx.fillText(
    compassText,
    w / 2 - ctx.measureText(compassText).width / 2,
    w / 2 + w / 8
  );

  ctx.beginPath();
  ctx.moveTo(w / 2, w / 2 - w / 20);
  ctx.lineTo(w / 2, w / 2 + w / 20);
  ctx.moveTo(w / 2 - w / 20, w / 2);
  ctx.lineTo(w / 2 + w / 20, w / 2);
  ctx.stroke();

  ctx.fillText("N", w / 2 - ctx.measureText("N").width / 2, w / 2 - w / 18);

  let compassHeadingRadians = (compassHeading * Math.PI) / 180;

  ctx.translate(w / 2, w / 2);
  ctx.rotate(compassHeadingRadians);
  ctx.translate(-w / 2, -w / 2);
  ctx.beginPath();
  ctx.fillStyle = "#ff0000";
  ctx.moveTo(w / 2 - w / 75, w / 2);
  ctx.lineTo(w / 2 + w / 75, w / 2);
  ctx.lineTo(w / 2, w / 2 - w / 20);
  ctx.lineTo(w / 2 - w / 75, w / 2);
  ctx.fill();
  ctx.stroke();
  ctx.moveTo(w / 2 - w / 75, w / 2);
  ctx.lineTo(w / 2, w / 2 + w / 20);
  ctx.lineTo(w / 2 + w / 75, w / 2);
  ctx.stroke();
  ctx.translate(w / 2, w / 2);
  ctx.rotate(-compassHeadingRadians);
  ctx.translate(-w / 2, -w / 2);
  window.requestAnimationFrame(draw);
}

draw();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
