"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { CheckCircle } from "lucide-react";

const ink = "#0a0a0a";
const muted = "#6b7280";
const accent = "#0080e0";
const F = "var(--font-inter), system-ui, sans-serif";

const SKY = "#70c5ce";
const GROUND_TOP = "#ded895";
const GROUND_BOTTOM = "#c8b86a";
const PIPE_GREEN = "#73c026";
const PIPE_GREEN_DARK = "#4f8a1a";
const PIPE_GREEN_LIGHT = "#9ee85a";

type Pipe = { x: number; gapY: number; passed: boolean };
type Cloud = { x: number; y: number; scale: number; speed: number };

export default function PlayPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const state = useRef({
    birdY: 0,
    vel: 0,
    pipes: [] as Pipe[],
    clouds: [] as Cloud[],
    frame: 0,
    groundX: 0,
    running: false,
    over: false,
    flapAnim: 0,
  });

  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<"idle" | "playing" | "over">("idle");
  const [showWin, setShowWin] = useState(false);
  const [highScores, setHighScores] = useState<number[]>([]);
  const [justAddedIndex, setJustAddedIndex] = useState<number | null>(null);
  const wonOnce = useRef(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("flappyLuckyHighScores") || "[]");
      if (Array.isArray(saved)) setHighScores(saved.filter((n: unknown) => typeof n === "number"));
    } catch {}
  }, []);

  const dims = () => {
    const { w, h } = sizeRef.current;
    return {
      w, h,
      birdR: h * 0.022,
      pipeW: Math.max(60, w * 0.075),
      pipeGap: h * 0.24,
      groundH: h * 0.12,
      gravity: h * 0.0011,
      flapV: -h * 0.0155,
      pipeSpeed: Math.max(2.2, w * 0.0042),
      pipeSpacingPx: w * 0.45,
    };
  };

  const scoreRef = useRef(0);

  const reset = useCallback(() => {
    const { h } = sizeRef.current;
    state.current.birdY = h / 2;
    state.current.vel = 0;
    state.current.pipes = [];
    state.current.frame = 0;
    state.current.running = true;
    state.current.over = false;
    scoreRef.current = 0;
    setScore(0);
    setShowWin(false);
    setJustAddedIndex(null);
    setPhase("playing");
  }, []);

  const flap = useCallback(() => {
    const s = state.current;
    if (phase === "idle" || phase === "over") { reset(); return; }
    s.vel = dims().flapV;
    s.flapAnim = 10;
  }, [phase, reset]);

  const endGame = useCallback(() => {
    const s = state.current;
    s.running = false;
    s.over = true;
    setPhase("over");

    const finalScore = scoreRef.current;
    setHighScores(prev => {
      const next = [...prev, finalScore].sort((a, b) => b - a).slice(0, 5);
      setJustAddedIndex(next.lastIndexOf(finalScore));
      try { localStorage.setItem("flappyLuckyHighScores", JSON.stringify(next)); } catch {}
      return next;
    });

    if (!wonOnce.current) {
      wonOnce.current = true;
      setTimeout(() => setShowWin(true), 900);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      sizeRef.current = { w, h };
      canvas.width = w;
      canvas.height = h;
      if (state.current.clouds.length === 0) {
        state.current.clouds = Array.from({ length: 5 }, () => ({
          x: Math.random() * w,
          y: h * (0.08 + Math.random() * 0.28),
          scale: 0.6 + Math.random() * 0.8,
          speed: 0.25 + Math.random() * 0.3,
        }));
      }
      if (state.current.birdY === 0) state.current.birdY = h / 2;
    };
    resize();
    window.addEventListener("resize", resize);

    const drawBird = (x: number, y: number, vel: number, flapAnim: number, r: number) => {
      ctx.save();
      ctx.translate(x, y);
      const angle = Math.max(-0.5, Math.min(0.9, vel * 0.05));
      ctx.rotate(angle);

      const wingUp = flapAnim > 5;

      ctx.fillStyle = "#f8d347";
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 1.15, r, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#fff7e0";
      ctx.beginPath();
      ctx.ellipse(-r * 0.15, r * 0.35, r * 0.7, r * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#f2a93b";
      ctx.beginPath();
      if (wingUp) {
        ctx.ellipse(-r * 0.1, -r * 0.25, r * 0.6, r * 0.32, -0.4, 0, Math.PI * 2);
      } else {
        ctx.ellipse(-r * 0.1, r * 0.15, r * 0.6, r * 0.32, 0.3, 0, Math.PI * 2);
      }
      ctx.fill();

      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(r * 0.55, -r * 0.25, r * 0.32, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath();
      ctx.arc(r * 0.65, -r * 0.25, r * 0.14, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ef7f1a";
      ctx.beginPath();
      ctx.moveTo(r * 0.95, -r * 0.05);
      ctx.lineTo(r * 1.55, r * 0.08);
      ctx.lineTo(r * 0.95, r * 0.25);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    const drawPipe = (x: number, topH: number, bottomY: number, h: number, pipeW: number) => {
      const capH = pipeW * 0.28;
      const capOverhang = pipeW * 0.12;

      ctx.fillStyle = PIPE_GREEN;
      ctx.fillRect(x, 0, pipeW, Math.max(0, topH - capH));
      ctx.fillRect(x, bottomY + capH, pipeW, Math.max(0, h - (bottomY + capH)));

      ctx.fillStyle = PIPE_GREEN_DARK;
      ctx.fillRect(x, 0, pipeW * 0.18, Math.max(0, topH - capH));
      ctx.fillRect(x, bottomY + capH, pipeW * 0.18, Math.max(0, h - (bottomY + capH)));
      ctx.fillRect(x + pipeW - pipeW * 0.1, 0, pipeW * 0.1, Math.max(0, topH - capH));
      ctx.fillRect(x + pipeW - pipeW * 0.1, bottomY + capH, pipeW * 0.1, Math.max(0, h - (bottomY + capH)));

      ctx.fillStyle = PIPE_GREEN_LIGHT;
      ctx.fillRect(x + pipeW * 0.22, 0, pipeW * 0.12, Math.max(0, topH - capH));
      ctx.fillRect(x + pipeW * 0.22, bottomY + capH, pipeW * 0.12, Math.max(0, h - (bottomY + capH)));

      ctx.fillStyle = PIPE_GREEN;
      ctx.fillRect(x - capOverhang, topH - capH, pipeW + capOverhang * 2, capH);
      ctx.fillRect(x - capOverhang, bottomY, pipeW + capOverhang * 2, capH);
      ctx.fillStyle = PIPE_GREEN_DARK;
      ctx.fillRect(x - capOverhang, topH - capH, (pipeW + capOverhang * 2) * 0.18, capH);
      ctx.fillRect(x - capOverhang, bottomY, (pipeW + capOverhang * 2) * 0.18, capH);
      ctx.fillStyle = PIPE_GREEN_LIGHT;
      ctx.fillRect(x - capOverhang + (pipeW + capOverhang * 2) * 0.24, topH - capH, (pipeW + capOverhang * 2) * 0.1, capH);
      ctx.fillRect(x - capOverhang + (pipeW + capOverhang * 2) * 0.24, bottomY, (pipeW + capOverhang * 2) * 0.1, capH);
    };

    const loop = () => {
      const s = state.current;
      const { w, h, birdR, pipeW, pipeGap, groundH, gravity, pipeSpeed, pipeSpacingPx } = dims();

      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, "#4ec0ca");
      sky.addColorStop(1, SKY);
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "rgba(255,255,255,0.85)";
      s.clouds.forEach(c => {
        c.x -= c.speed;
        if (c.x < -80 * c.scale) c.x = w + 80 * c.scale;
        const cw = 70 * c.scale, ch = 26 * c.scale;
        ctx.beginPath();
        ctx.ellipse(c.x, c.y, cw, ch, 0, 0, Math.PI * 2);
        ctx.ellipse(c.x + cw * 0.55, c.y + ch * 0.15, cw * 0.6, ch * 0.75, 0, 0, Math.PI * 2);
        ctx.ellipse(c.x - cw * 0.55, c.y + ch * 0.2, cw * 0.5, ch * 0.65, 0, 0, Math.PI * 2);
        ctx.fill();
      });

      if (s.running) {
        s.frame++;
        s.vel += gravity;
        s.birdY += s.vel;
        if (s.flapAnim > 0) s.flapAnim--;
        s.groundX -= pipeSpeed;

        if (s.pipes.length === 0 || (w - s.pipes[s.pipes.length - 1].x) >= pipeSpacingPx) {
          const margin = h * 0.12;
          const gapY = margin + Math.random() * (h - groundH - margin * 2 - pipeGap);
          s.pipes.push({ x: w + 20, gapY, passed: false });
        }

        s.pipes.forEach(p => (p.x -= pipeSpeed));
        s.pipes = s.pipes.filter(p => p.x > -pipeW - 40);

        const birdX = w * 0.32;
        for (const p of s.pipes) {
          if (!p.passed && p.x + pipeW < birdX - birdR) {
            p.passed = true;
            scoreRef.current += 1;
            setScore(scoreRef.current);
          }
          const hitX = birdX + birdR > p.x && birdX - birdR < p.x + pipeW;
          const hitY = s.birdY - birdR < p.gapY || s.birdY + birdR > p.gapY + pipeGap;
          if (hitX && hitY) endGame();
        }

        if (s.birdY + birdR > h - groundH) {
          s.birdY = h - groundH - birdR;
          endGame();
        }
        if (s.birdY - birdR < 0) {
          s.birdY = birdR;
          s.vel = 0;
        }
      }

      const birdX = w * 0.32;
      s.pipes.forEach(p => drawPipe(p.x, p.gapY, p.gapY + pipeGap, h - groundH, pipeW));

      ctx.fillStyle = GROUND_TOP;
      ctx.fillRect(0, h - groundH, w, groundH * 0.25);
      ctx.fillStyle = GROUND_BOTTOM;
      ctx.fillRect(0, h - groundH * 0.75, w, groundH * 0.75);

      ctx.fillStyle = "rgba(0,0,0,0.08)";
      const stripeW = 28;
      let gx = (s.groundX % stripeW) - stripeW;
      while (gx < w) {
        ctx.fillRect(gx, h - groundH, 14, groundH * 0.25);
        gx += stripeW;
      }

      drawBird(birdX, s.birdY, s.vel, s.flapAnim, birdR);

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [endGame]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") { e.preventDefault(); flap(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flap]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const blockTouchMove = (e: TouchEvent) => e.preventDefault();
    window.addEventListener("touchmove", blockTouchMove, { passive: false });

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      window.removeEventListener("touchmove", blockTouchMove);
    };
  }, []);

  return (
    <div
      onPointerDown={e => { e.preventDefault(); flap(); }}
      style={{ position: "fixed", inset: 0, overflow: "hidden", fontFamily: F, color: ink, cursor: "pointer", userSelect: "none" as const, touchAction: "none", WebkitUserSelect: "none" as const, WebkitTapHighlightColor: "transparent", background: SKY }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, display: "block", touchAction: "none" }} />

      <a
        href="/"
        onPointerDown={e => e.stopPropagation()}
        style={{ position: "absolute", top: "20px", right: "20px", zIndex: 20, fontSize: "13px", fontWeight: 700, color: "#fff", background: "rgba(10,15,26,0.35)", border: "1px solid rgba(255,255,255,0.4)", borderRadius: "999px", padding: "8px 18px", textDecoration: "none", letterSpacing: "0.06em", textTransform: "uppercase" as const }}
      >
        Back
      </a>

      {(phase === "playing" || phase === "over") && (
        <div style={{ position: "absolute", top: "24px", left: "50%", transform: "translateX(-50%)", zIndex: 20, fontSize: "44px", fontWeight: 900, color: "#fff", textShadow: "0 3px 0 rgba(0,0,0,0.25)", letterSpacing: "0.02em" }}>
          {score}
        </div>
      )}

      {phase === "idle" && (
        <div style={{ position: "absolute", inset: 0, zIndex: 15, display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", gap: "18px", background: "rgba(10,15,26,0.25)", textAlign: "center" as const, padding: "0 24px" }}>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "#fff", background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.35)", borderRadius: "999px", padding: "6px 16px", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>
            LS Growth Arcade
          </span>
          <h1 style={{ fontSize: "clamp(32px,6vw,56px)", fontWeight: 900, color: "#fff", textShadow: "0 4px 0 rgba(0,0,0,0.25)", letterSpacing: "-0.02em", margin: 0 }}>
            Flappy Lucky
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.9)", margin: 0 }}>
            Tap, click, or press Space to flap
          </p>
        </div>
      )}

      {phase === "over" && !showWin && (
        <div style={{ position: "absolute", inset: 0, zIndex: 15, display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", gap: "20px", background: "rgba(10,15,26,0.35)", padding: "0 24px" }}>
          <span style={{ color: "#fff", fontSize: "20px", fontWeight: 800, textShadow: "0 3px 0 rgba(0,0,0,0.25)" }}>Nice try…</span>

          {highScores.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: "6px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.75)", letterSpacing: "0.1em", textTransform: "uppercase" as const, textShadow: "0 2px 0 rgba(0,0,0,0.25)" }}>
                High Scores
              </div>
              {highScores.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", fontWeight: i === justAddedIndex ? 800 : 500, color: i === justAddedIndex ? "#7cd4ff" : "#fff", fontSize: "14px", textShadow: "0 2px 0 rgba(0,0,0,0.25)" }}>
                  <span>{i + 1}.</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          )}

          <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "13px" }}>Tap to play again</span>
        </div>
      )}

      {showWin && (
        <div onPointerDown={e => e.stopPropagation()} style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", cursor: "default", touchAction: "none" }}>
          <div onClick={() => setShowWin(false)} style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.6)", backdropFilter: "blur(6px)" }} />
          <div style={{ position: "relative", width: "100%", maxWidth: "420px", background: "#fff", borderRadius: "16px", boxShadow: "0 24px 80px rgba(0,0,0,0.25)", padding: "40px 32px", textAlign: "center" as const }}>
            <CheckCircle style={{ width: "48px", height: "48px", color: accent, margin: "0 auto 16px" }} />
            <h3 style={{ fontSize: "22px", fontWeight: 800, color: ink, marginBottom: "8px" }}>You've won a free 15-minute call with Lucky!</h3>
            <p style={{ fontSize: "14px", color: muted, lineHeight: 1.6, marginBottom: "24px" }}>
              Score: {score}. No catch, just grab a time that works for you.
            </p>
            <a href="/book" className="btn" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", padding: "14px", background: accent, color: "#fff", fontSize: "14px", fontWeight: 700, textDecoration: "none", borderRadius: "4px", marginBottom: "10px", boxSizing: "border-box" as const }}>
              Claim your free call
            </a>
            <button onClick={() => setShowWin(false)} style={{ fontSize: "13px", color: muted, background: "none", border: "none", cursor: "pointer", fontFamily: F, textDecoration: "underline" }}>
              Maybe later
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
