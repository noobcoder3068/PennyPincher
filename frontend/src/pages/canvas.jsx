import React, { useEffect, useRef } from 'react';
import './canvas.css';

const CanvasAnimation = () => {
  const canvasRef = useRef(null);
  let ctx, w, h, units;
  let unitCount = 100;
  let hue = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    ctx = canvas.getContext('2d');

    resizeReset();
    createUnits();
    animationLoop();

    // Event listeners
    window.addEventListener('resize', resizeReset);

    return () => {
      window.removeEventListener('resize', resizeReset);
    };
  }, []);

  function resizeReset() {
    w = canvasRef.current.width = window.innerWidth;
    h = canvasRef.current.height = window.innerHeight;

    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, w, h);
  }

  function createUnits() {
    units = [];
    for (let i = 0; i < unitCount; i++) {
      setTimeout(() => {
        units.push(new Unit());
      }, i * 200);
    }
  }

  function animationLoop() {
    ctx.fillStyle = 'rgba(0, 0, 0, .05)';
    ctx.fillRect(0, 0, w, h);

    drawScene();
    requestAnimationFrame(animationLoop);
  }

  function drawScene() {
    for (let i = 0; i < units.length; i++) {
      units[i].update();
      units[i].draw();
    }
  }

  function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  }

  class Unit {
    constructor() {
      this.reset();
      this.constructed = true;
    }
    reset() {
      this.x = Math.round(w / 2);
      this.y = Math.round(h / 2);
      this.sx = this.x;
      this.sy = this.y;
      this.angle = 60 * getRandomInt(0, 5);
      this.size = 1;
      this.radian = (Math.PI / 180) * (this.angle + 90);
      this.speed = 2;
      this.maxDistance = 30;
      this.time = 0;
      this.ttl = getRandomInt(180, 300);
      this.hue = hue;
      hue += 0.5;
    }
    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
      ctx.shadowColor = `hsl(${this.hue}, 100%, 50%)`;
      ctx.shadowBlur = 5;
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    }
    update() {
      let dx = this.sx - this.x;
      let dy = this.sy - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance >= this.maxDistance) {
        if (getRandomInt(0, 1)) {
          this.angle += 60;
        } else {
          this.angle -= 60;
        }

        this.radian = (Math.PI / 180) * (this.angle + 90);
        this.sx = this.x;
        this.sy = this.y;
      }

      this.x += this.speed * Math.sin(this.radian);
      this.y += this.speed * Math.cos(this.radian);

      if (this.time >= this.ttl || this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
        this.reset();
      }

      this.time++;
    }
  }

  return (
    <div>
      <canvas ref={canvasRef} id="canvas"></canvas>
      <a className="youtube-link" href="https://youtu.be/C3tbDU8-j6E" target="_blank"></a>
    </div>
  );
};

export default CanvasAnimation;
