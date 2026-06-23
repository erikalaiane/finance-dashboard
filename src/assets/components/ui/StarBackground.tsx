import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  pulseSpeed: number;
  pulseOffset: number;
  color: string;
}

const COLORS = [
  "#C084FC", // lilac
  "#EC4899", // pink
  "#9333EA", // violeta
  "#F0ABFC", // lavanda clara
];

function createStar(width: number, height: number): Star {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 10 + 4,
    opacity: Math.random() * 0.5 + 0.2,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.008,
    pulseSpeed: Math.random() * 0.02 + 0.008,
    pulseOffset: Math.random() * Math.PI * 2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  star: Star,
  time: number
) {
  const pulse = Math.sin(time * star.pulseSpeed + star.pulseOffset);
  const currentOpacity = star.opacity * (0.6 + 0.4 * pulse);
  const currentSize = star.size * (0.85 + 0.15 * pulse);

  ctx.save();
  ctx.translate(star.x, star.y);
  ctx.rotate(star.rotation);

  // Glow externo
  const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, currentSize * 3);
  glow.addColorStop(0, star.color + "55");
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, currentSize * 3, 0, Math.PI * 2);
  ctx.fill();

  // Estrela de 4 pontas
  ctx.globalAlpha = currentOpacity;
  ctx.fillStyle = star.color;
  ctx.beginPath();

  const outer = currentSize;
  const inner = currentSize * 0.2;

  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4;
    const r = i % 2 === 0 ? outer : inner;
    if (i === 0) {
      ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
    } else {
      ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
    }
  }

  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

const STAR_COUNT = 55;

export function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      starsRef.current = Array.from({ length: STAR_COUNT }, () =>
        createStar(canvas.width, canvas.height)
      );
    };

    resize();
    window.addEventListener("resize", resize);

    const startTime = performance.now();

    const animate = (now: number) => {
      const time = (now - startTime) * 0.001;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of starsRef.current) {
        star.rotation += star.rotationSpeed;
        drawStar(ctx, star, time);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}