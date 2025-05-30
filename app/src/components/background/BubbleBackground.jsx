import { useEffect, useRef } from "react";
import style from "./BubbleBackground.module.css";

function BubbleBackground({ children }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const getSize = (px) => window.innerWidth * px;

    const randomRangeExclusive = (min, max, excludeMin, excludeMax) => {
      let randomNumber;
      do {
        randomNumber = Math.random() * (max - min) + min;
      } while (randomNumber >= excludeMin && randomNumber <= excludeMax);
      return randomNumber;
    };

    const colors = [
      "rgba(235, 233, 120, 0.5)",
      "rgba(120, 191, 235, 0.5)",
      "rgba(235, 120, 121, 0.5)",
    ];

    class Ball {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.velX = randomRangeExclusive(-2, 2, -0.5, 0.5);
        this.velY = randomRangeExclusive(-2, 2, -0.5, 0.5);
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.radius = getSize(0.05);
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      }

      update() {
        if (
          this.x + this.radius > canvas.width ||
          this.x - this.radius < 0
        ) {
          this.velX = -this.velX;
        }
        if (
          this.y + this.radius > canvas.height ||
          this.y - this.radius < 0
        ) {
          this.velY = -this.velY;
        }

        this.x += this.velX;
        this.y += this.velY;
      }
    }

    const maxBalls = 35;
    let balls = [];

    const init = () => {
      balls = [];
      for (let i = 0; i < maxBalls; i++) {
        balls.push(new Ball());
      }
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "overlay";

      balls.forEach((ball) => {
        ball.draw(ctx);
        ball.update();
      });

      requestAnimationFrame(loop);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();
    init();
    loop();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [1]);

  return (
    <div className={style.bubble}>
      <canvas ref={canvasRef} className={style.canvas} />
      <div className={style.children}>{children}</div>
    </div>
  );
}

export default BubbleBackground;