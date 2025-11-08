import React, { useEffect, useRef } from 'react';

// Peaceful, child-friendly animated background with soft orbs and gentle fireflies.
// Runs on an offscreen canvas and listens to window events so it doesn't block UI.
const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, has: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    let width = canvas.width = window.innerWidth * Math.min(window.devicePixelRatio || 1, 1.5);
    let height = canvas.height = window.innerHeight * Math.min(window.devicePixelRatio || 1, 1.5);

    const logicalW = () => width / Math.min(window.devicePixelRatio || 1, 1.5);
    const logicalH = () => height / Math.min(window.devicePixelRatio || 1, 1.5);

    // Colors: soft, friendly pastels
    const ORB_COLORS = [
      '#A7F3D0', // mint
      '#BFDBFE', // baby blue
      '#FDE68A', // soft yellow
      '#FBCFE8', // pink
      '#C4B5FD', // lavender
    ];

    const FIREFLY_COLOR = 'rgba(255, 255, 255, 0.85)';

    const orbs = [];
    const flies = [];

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    const orbCount = Math.round(10 + Math.min(logicalW(), 1200) / 160);
    const flyCount = Math.round(20 + Math.min(logicalW(), 1200) / 40);

    for (let i = 0; i < orbCount; i++) {
      const r = 80 + Math.random() * 140;
      orbs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r,
        baseR: r,
        hue: ORB_COLORS[i % ORB_COLORS.length],
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.005 + Math.random() * 0.01,
      });
    }

    for (let i = 0; i < flyCount; i++) {
      flies.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 1.2 + Math.random() * 1.6,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.02 + Math.random() * 0.02,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle background gradient wash
      const grad = ctx.createRadialGradient(width * 0.5, height * 0.45, Math.min(width, height) * 0.05, width * 0.5, height * 0.45, Math.max(width, height) * 0.8);
      grad.addColorStop(0, 'rgba(15, 23, 42, 0.6)');
      grad.addColorStop(1, 'rgba(2, 6, 23, 1)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Soft orbs
      for (const o of orbs) {
        // Wobble and gentle drift
        o.wobble += o.wobbleSpeed;
        o.x += o.vx + Math.cos(o.wobble) * 0.15;
        o.y += o.vy + Math.sin(o.wobble) * 0.15;

        // Cursor interaction: gentle attraction then soft repulsion near center
        if (mouseRef.current.has) {
          const dx = (mouseRef.current.x * Math.min(window.devicePixelRatio || 1, 1.5)) - o.x;
          const dy = (mouseRef.current.y * Math.min(window.devicePixelRatio || 1, 1.5)) - o.y;
          const d = Math.hypot(dx, dy) + 0.0001;
          const influence = clamp(1 - d / (Math.min(width, height) * 0.6), -0.2, 0.6);
          o.x += (dx / d) * influence * 0.6;
          o.y += (dy / d) * influence * 0.6;
          o.r = clamp(o.baseR * (1 + influence * 0.12), o.baseR * 0.85, o.baseR * 1.2);
        } else {
          o.r += Math.sin(o.wobble) * 0.05;
        }

        // Wrap around edges for continuous feel
        if (o.x < -o.r) o.x = width + o.r;
        if (o.x > width + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = height + o.r;
        if (o.y > height + o.r) o.y = -o.r;

        const g = ctx.createRadialGradient(o.x, o.y, o.r * 0.1, o.x, o.y, o.r);
        g.addColorStop(0, `${o.hue}CC`);
        g.addColorStop(1, `${o.hue}00`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Fireflies
      ctx.save();
      ctx.shadowColor = 'rgba(255,255,255,0.8)';
      ctx.shadowBlur = 12;
      for (const f of flies) {
        f.twinkle += f.twinkleSpeed;
        const tw = (1 + Math.sin(f.twinkle)) * 0.5; // 0..1
        f.x += f.vx * (0.5 + tw * 0.5);
        f.y += f.vy * (0.5 + tw * 0.5);

        // gentle mouse attraction
        if (mouseRef.current.has) {
          const dx = (mouseRef.current.x * Math.min(window.devicePixelRatio || 1, 1.5)) - f.x;
          const dy = (mouseRef.current.y * Math.min(window.devicePixelRatio || 1, 1.5)) - f.y;
          const d = Math.hypot(dx, dy) + 0.0001;
          if (d < Math.min(width, height) * 0.35) {
            f.x += (dx / d) * 0.25;
            f.y += (dy / d) * 0.25;
          }
        }

        // Wrap
        if (f.x < -10) f.x = width + 10;
        if (f.x > width + 10) f.x = -10;
        if (f.y < -10) f.y = height + 10;
        if (f.y > height + 10) f.y = -10;

        const size = f.size * (0.6 + tw * 0.8);
        ctx.fillStyle = FIREFLY_COLOR;
        ctx.beginPath();
        ctx.arc(f.x, f.y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      rafRef.current = requestAnimationFrame(draw);
    };

    const onResize = () => {
      width = canvas.width = window.innerWidth * Math.min(window.devicePixelRatio || 1, 1.5);
      height = canvas.height = window.innerHeight * Math.min(window.devicePixelRatio || 1, 1.5);
    };

    const onMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.has = true;
    };
    const onMouseLeave = () => {
      mouseRef.current.has = false;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave, { passive: true });
    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        mouseRef.current.has = true;
      }
    }, { passive: true });
    window.addEventListener('touchend', onMouseLeave, { passive: true });
    window.addEventListener('resize', onResize);

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchmove', () => {});
      window.removeEventListener('touchend', onMouseLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <canvas ref={canvasRef} className="h-full w-full opacity-90" />
      {/* soft vignette edges */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_40%,rgba(255,255,255,0.06),rgba(255,255,255,0)_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_80%_10%,rgba(186,230,253,0.08),rgba(255,255,255,0)_70%)]" />
    </div>
  );
};

export default AnimatedBackground;
