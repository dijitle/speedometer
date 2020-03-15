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
  ctx.strokeStyle = "#ffffff";
  ctx.fillStyle = "#ffffff";
  let gpsText = "GPS: ±" + strength + "m";
  ctx.fillText(
    gpsText,
    w / 2 - ctx.measureText(gpsText).width / 2,
    w / 2 - w / 10
  );
}

export function drawCoords(ctx, w, lat, lon) {
  ctx.font = String(w / 35) + "px monospace";
  ctx.strokeStyle = "#ffffff";
  ctx.fillStyle = "#ffffff";

  let latDeg = Math.floor(Math.abs(lat));
  let latMin = Math.floor((Math.abs(lat) - latDeg) * 60);
  let latSec = ((Math.abs(lat) - latDeg - latMin / 60) * 3600).toFixed(2);
  let latDir = lat > 0 ? "N" : "S";

  let lonDeg = Math.floor(Math.abs(lon));
  let lonMin = Math.floor((Math.abs(lon) - lonDeg) * 60);
  let lonSec = ((Math.abs(lon) - lonDeg - lonMin / 60) * 3600).toFixed(2);
  let lonDir = lon > 0 ? "E" : "W";

  let gpsText =
    latDeg +
    "° " +
    latMin +
    "' " +
    latSec +
    '"' +
    latDir +
    ", " +
    lonDeg +
    "° " +
    lonMin +
    "' " +
    lonSec +
    '"' +
    lonDir;
  ctx.fillText(
    gpsText,
    w / 2 - ctx.measureText(gpsText).width / 2,
    w / 2 + w / 3
  );
}
