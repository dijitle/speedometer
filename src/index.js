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
  ctx.strokeStyle = "#000000";
  ctx.beginPath();
  ctx.arc(w/2 , w/2, w/2.3, (3/4) * Math.PI , (1/4) * Math.PI);

  ctx.lineWidth = w/20;

  ctx.stroke();


  ctx.beginPath();
  ctx.arc(w/2 , w/2, w/5, (3/4) * Math.PI , (1/4) * Math.PI);

  ctx.lineWidth = w/50;

  ctx.stroke();


  var percentSpeed = 0;

  var angleOfSpeedometer = ((3/2) * Math.PI * percentSpeed * 100) + 

  ctx.beginPath();
  ctx.strokeStyle = "#FF0000";
  ctx.moveTo(w/2, w/2)


  ctx.lineTo(10, 20)

  ctx.stroke();

  window.requestAnimationFrame(draw);
}

draw();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
