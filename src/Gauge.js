export function drawNeedle(
  ctx,
  w,
  value,
  min,
  max,
  startAngle,
  endAngle,
  innerRadius,
  outerRadius
) {
  let percentSpeed = value / (max - min);

  let angleOfSpeedometer =
    (2 * Math.PI - (startAngle - endAngle)) * percentSpeed + startAngle;

  ctx.beginPath();
  ctx.strokeStyle = "#FF0000";
  ctx.lineWidth = w / 50;
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
}
export function drawDigitalSpeed(ctx, w, value) {
  ctx.lineWidth = w / 50;
  ctx.font = String(w / 8) + "px monospace";
  let valueText = 10 ? Math.round(value) : Math.round(value * 10) / 10;

  ctx.fillText(
    valueText,
    w / 2 - ctx.measureText(valueText).width / 2,
    w / 2 + w / 4
  );
  ctx.stroke();
}

export function drawArc(ctx, w, width, radius, startAngle, endAngle, connect) {
  ctx.beginPath();
  ctx.arc(w / 2, w / 2, radius, startAngle, endAngle);
  ctx.lineWidth = width;
  ctx.stroke();

  if (connect) {
    ctx.moveTo(
      w / 2 + radius * Math.cos(startAngle),
      w / 2 + radius * Math.sin(startAngle)
    );
    ctx.lineTo(
      w / 2 + radius * Math.cos(endAngle),
      w / 2 + radius * Math.sin(endAngle)
    );
    ctx.stroke();
  }
}

export function drawLabels(
  ctx,
  w,
  radius,
  min,
  max,
  startAngle,
  endAngle,
  intervals
) {
  ctx.beginPath();

  for (let i = 0; i <= intervals; i++) {
    let angle =
      (2 * Math.PI - (startAngle - endAngle)) * (i / intervals) + startAngle;
    ctx.moveTo(
      w / 2 + radius * Math.cos(angle),
      w / 2 + radius * Math.sin(angle)
    );
    ctx.lineTo(
      w / 2 + radius * 0.9 * Math.cos(angle),
      w / 2 + radius * 0.9 * Math.sin(angle)
    );
    ctx.font = String(w / 25) + "px monospace";
    let text = String(i * ((max - min) / intervals));
    let textWidth = ctx.measureText(text).width / 2;
    ctx.fillText(
      text,
      w / 2 + radius * 0.8 * Math.cos(angle) - textWidth,
      w / 2 + radius * 0.8 * Math.sin(angle) + w / 100
    );
  }

  ctx.lineWidth = w / 80;
  ctx.stroke();
}
