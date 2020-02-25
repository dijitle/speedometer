export function drawCompass(ctx, w, compassHeading) {
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
}
