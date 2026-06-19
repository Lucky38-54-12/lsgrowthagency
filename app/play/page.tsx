"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";

const ink = "#0a0a0a";
const muted = "#6b7280";
const line = "#e5e7eb";
const accent = "#0080e0";
const dark = "#0a0f1a";
const F = "var(--font-inter), system-ui, sans-serif";

const W = 360;
const H = 600;
const GRAVITY = 0.45;
const FLAP_V = -7.6;
const PIPE_W = 60;
const PIPE_GAP = 155;
const PIPE_SPEED = 2.6;
const PIPE_SPACING = 220;
const BIRD_R = 14;

type Pipe = { x: number; gapY: number; passed: boolean };

export default function PlayPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const state = useRef({
    birdY: H / 2,
    vel: 0,
    pipes: [] as Pipe[],
    frame: 0,
    running: false,
    over: false,
  });

  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<"idle" | "playing" | "over">("idle");
  const [showWin, setShowWin] = useState(false);
  const wonOnce = useRef(false);

  const reset = useCallback(() => {
    state.current.birdY = H / 2;
    state.current.vel = 0;
    state.current.pipes = [];
    state.current.frame = 0;
    state.current.running = true;
    state.current.over = false;
    setScore(0);
    setPhase("playing");
  }, []);

  const flap = useCallback(() => {
    const s = state.current;
    if (phase === "idle") {
      reset();
      return;
    }
    if (phase === "over") return;
    s.vel = FLAP_V;
  }, [phase, reset]);

  const endGame = useCallback(() => {
    const s = state.current;
    s.running = false;
    s.over = true;
    setPhase("over");
    if (!wonOnce.current) {
      wonOnce.current = true;
      setTimeout(() => setShowWin(true), 700);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    const loop = () => {
      const s = state.current;

      ctx.fillStyle = "#bfe8f5";
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(10,15,26,0.06)";
      for (let gx = 0; gx < W; gx += 24) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
      }
      for (let gy = 0; gy < H; gy += 24) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
      }

      if (s.running) {
        s.frame++;
        s.vel += GRAVITY;
        s.birdY += s.vel;

        if (s.frame % Math.round(PIPE_SPACING / PIPE_SPEED) === 0) {
          const gapY = 90 + Math.random() * (H - 180 - PIPE_GAP);
          s.pipes.push({ x: W + 20, gapY, passed: false });
        }

        s.pipes.forEach(p => (p.x -= PIPE_SPEED));
        s.pipes = s.pipes.filter(p => p.x > -PIPE_W - 20);

        for (const p of s.pipes) {
          if (!p.passed && p.x + PIPE_W < W / 2 - BIRD_R) {
            p.passed = true;
            setScore(sc => sc + 1);
          }
          const birdX = W / 2;
          const hitX = birdX + BIRD_R > p.x && birdX - BIRD_R < p.x + PIPE_W;
          const hitY = s.birdY - BIRD_R < p.gapY || s.birdY + BIRD_R > p.gapY + PIPE_GAP;
          if (hitX && hitY) endGame();
        }

        if (s.birdY + BIRD_R > H - 20 || s.birdY - BIRD_R < 0) {
          s.birdY = Math.max(BIRD_R, Math.min(H - 20 - BIRD_R, s.birdY));
          endGame();
        }
      }

      ctx.fillStyle = "#7cc97a";
      ctx.fillRect(0, H - 20, W, 20);

      ctx.fillStyle = dark;
      state.current.pipes.forEach(p => {
        ctx.fillRect(p.x, 0, PIPE_W, p.gapY);
        ctx.fillRect(p.x, p.gapY + PIPE_GAP, PIPE_W, H - (p.gapY + PIPE_GAP));
        ctx.fillStyle = accent;
        ctx.fillRect(p.x - 3, p.gapY - 12, PIPE_W + 6, 12);
        ctx.fillRect(p.x - 3, p.gapY + PIPE_GAP, PIPE_W + 6, 12);
        ctx.fillStyle = dark;
      });

      const birdX = W / 2;
      ctx.save();
      ctx.translate(birdX, state.current.birdY);
      const angle = Math.max(-0.4, Math.min(0.9, state.current.vel * 0.06));
      ctx.rotate(angle);
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(0, 0, BIRD_R, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(5, -4, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = dark;
      ctx.beginPath();
      ctx.arc(6, -4, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [endGame]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") { e.preventDefault(); flap(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flap]);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(170deg, #d6e8f5 0%, #e8f2f9 15%, #f2f7fb 35%, #f8fafb 60%, #ffffff 100%)", fontFamily: F, color: ink }}>
      <style suppressHydrationWarning>{`
        @media (max-width: 640px) {
          .play-nav { padding: 0 16px !important; height: 64px !important; }
          .play-logo { height: 40px !important; }
          .play-back-text { display: none !important; }
          .play-content { padding: 88px 16px 48px !important; }
        }
      `}</style>

      <nav className="play-nav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, padding: "0 48px", height: "80px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${line}` }}>
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <img className="play-logo" src="/ls-growth-logo-new.png" alt="LS Growth" style={{ height: "52px", width: "auto", objectFit: "contain" }} />
        </a>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 700, color: ink, background: "transparent", borderRadius: "999px", padding: "12px 28px", textDecoration: "none", border: `2px solid ${ink}`, letterSpacing: "0.06em", textTransform: "uppercase" as const, flexShrink: 0 }}>
          <ArrowLeft style={{ width: "13px", height: "13px" }} /> <span className="play-back-text">Back to site</span>
        </a>
      </nav>

      <div className="play-content" style={{ maxWidth: "440px", margin: "0 auto", padding: "120px 24px 60px", textAlign: "center" as const }}>
        <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 600, color: ink, background: "#f1f5f9", border: `1px solid ${line}`, borderRadius: "999px", padding: "6px 16px", letterSpacing: "0.04em", marginBottom: "16px" }}>
          LS Growth Arcade
        </span>
        <h1 style={{ fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: "10px" }}>
          Flap your way to a free call.
        </h1>
        <p style={{ fontSize: "14px", color: muted, lineHeight: 1.6, marginBottom: "24px" }}>
          Just give it a go. However far you get, you win a free 15-minute chat with Lucky.
        </p>

        <div
          onMouseDown={flap}
          onTouchStart={e => { e.preventDefault(); flap(); }}
          style={{ position: "relative", width: "100%", maxWidth: `${W}px`, margin: "0 auto", background: "#fff", border: `1px solid ${line}`, borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 32px rgba(0,0,0,0.08)", cursor: "pointer", userSelect: "none" as const }}
        >
          <div style={{ position: "absolute", top: "12px", left: "50%", transform: "translateX(-50%)", zIndex: 5, fontSize: "28px", fontWeight: 900, color: "#fff", textShadow: "0 2px 6px rgba(0,0,0,0.35)" }}>
            {score}
          </div>

          <canvas ref={canvasRef} width={W} height={H} style={{ width: "100%", height: "auto", display: "block" }} />

          {phase === "idle" && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(10,15,26,0.35)" }}>
              <span style={{ color: "#fff", fontSize: "16px", fontWeight: 700 }}>Tap or press Space to start</span>
            </div>
          )}

          {phase === "over" && !showWin && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(10,15,26,0.45)" }}>
              <span style={{ color: "#fff", fontSize: "16px", fontWeight: 700 }}>Nice try…</span>
            </div>
          )}
        </div>

        {phase === "over" && (
          <button
            onClick={reset}
            style={{ marginTop: "20px", fontSize: "13px", fontWeight: 600, color: ink, background: "#fff", border: `1px solid ${line}`, borderRadius: "0", padding: "10px 22px", cursor: "pointer", fontFamily: F }}
          >
            Play again
          </button>
        )}
      </div>

      {showWin && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
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
