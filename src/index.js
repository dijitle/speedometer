import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));



function draw() {
  var canvas = document.getElementById('speedometer');
  var ctx = canvas.getContext('2d');

  var w = canvas.width;

  let startAngle = (3/4) * Math.PI;
  let endAngle = (1/4) * Math.PI;

  let outerRadius = w/2.2;
  let innerRadius = w/5;

  let value = (new Date()).getSeconds()

  let min = 0;
  let max = 160;
  let intervals = 16;

  ctx.lineCap = "round";

  ctx.clearRect(0,0,w, w);
  ctx.strokeStyle = "#000000";
  
  //outer arc
  ctx.beginPath();
  ctx.arc(w/2 , w/2, outerRadius, startAngle , endAngle);
  ctx.lineWidth = w/20;
  ctx.stroke();

  //inner arc
  ctx.beginPath();
  ctx.arc(w/2 , w/2, innerRadius, startAngle, endAngle);
  ctx.lineWidth = w/50;
  ctx.stroke();

  //labels
  ctx.beginPath();

  for(let i = 0; i <= intervals; i++) {

    let angle = ((2 * Math.PI - (startAngle - endAngle)) * (i / intervals)) + startAngle;
    ctx.moveTo(w/2 + outerRadius * Math.cos(angle), w/2 + outerRadius * Math.sin(angle));
    ctx.lineTo(w/2 + outerRadius * .9 * Math.cos(angle), w/2 + outerRadius * .9 * Math.sin(angle));
    ctx.font = String(w / 25) +  "px monospace";
    let text = String(i *  ((max - min) /intervals));
    let textWidth = ctx.measureText(text).width / 2;
    ctx.fillText(text, 
    (w/2 + outerRadius * .8 * Math.cos(angle)) - textWidth, 
    (w/2 + outerRadius * .8 * Math.sin(angle)) + 5);
  }
 
  ctx.lineWidth = w/80;
  ctx.stroke()


  //needle
  let percentSpeed = value / (max - min);

  let angleOfSpeedometer = ((2 * Math.PI - (startAngle - endAngle)) * percentSpeed) + startAngle;

  ctx.beginPath();
  ctx.strokeStyle = "#FF0000";
  ctx.moveTo(w/2 + innerRadius * 1.1 * Math.cos(angleOfSpeedometer), w/2 + innerRadius * 1.1 * Math.sin(angleOfSpeedometer))


  ctx.lineTo(w/2 + outerRadius * .9 * Math.cos(angleOfSpeedometer), w/2 + outerRadius * .9 * Math.sin(angleOfSpeedometer))

  ctx.stroke();




  window.requestAnimationFrame(draw);
}

draw();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
