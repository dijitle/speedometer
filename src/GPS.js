export function drawGPS(ctx, w, strength) {
  ctx.beginPath();
  ctx.strokeStyle = "#69ff69";
  ctx.fillStyle = "#00ff00";
  ctx.lineWidth = w / 500;
  ctx.arc(w / 2 - w / 15, w / 2 - w / 7, w / 60, 0, 2 * Math.PI);
  if (strength > 100) {
    ctx.stroke();
  } else {
    ctx.fill();
  }

  ctx.beginPath();
  ctx.lineWidth = w / 500;
  ctx.arc(w / 2 - w / 30, w / 2 - w / 7, w / 60, 0, 2 * Math.PI);
  if (strength > 50) {
    ctx.stroke();
  } else {
    ctx.fill();
  }

  ctx.beginPath();
  ctx.lineWidth = w / 500;
  ctx.arc(w / 2, w / 2 - w / 7, w / 60, 0, 2 * Math.PI);
  if (strength > 25) {
    ctx.stroke();
  } else {
    ctx.fill();
  }

  ctx.beginPath();
  ctx.lineWidth = w / 500;
  ctx.arc(w / 2 + w / 30, w / 2 - w / 7, w / 60, 0, 2 * Math.PI);
  if (strength > 10) {
    ctx.stroke();
  } else {
    ctx.fill();
  }

  ctx.beginPath();
  ctx.lineWidth = w / 500;
  ctx.arc(w / 2 + w / 15, w / 2 - w / 7, w / 60, 0, 2 * Math.PI);
  if (strength > 5) {
    ctx.stroke();
  } else {
    ctx.fill();
  }

  ctx.font = String(w / 40) + "px monospace";
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#000000";
  let gpsText = "GPS: +/-" + strength + "m";
  ctx.fillText(
    gpsText,
    w / 2 - ctx.measureText(gpsText).width / 2,
    w / 2 - w / 10
  );
}
