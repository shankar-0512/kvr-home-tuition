"use client";
import { useEffect, useRef } from "react";

const SYMBOLS = [
  "∫", "π", "Σ", "Δ", "λ", "θ", "∞", "√", "α", "β", "ω", "∇", "φ",
  "F=ma", "E=mc²", "v=λf", "PV=nRT", "a²+b²", "sin²+cos²=1",
];

interface Orbital    { rx: number; ry: number; tilt: number; speed: number; phase: number }
interface AtomObj    { x: number; y: number; vx: number; vy: number; label: string; r: number; orbitals: Orbital[]; opacity: number }
interface Bond       { dx: number; dy: number; label: string }
interface MolObj     { x: number; y: number; vx: number; vy: number; center: string; bonds: Bond[]; opacity: number }
interface Particle   { x: number; y: number; vx: number; vy: number; symbol: string; size: number; opacity: number; rot: number; rotSpeed: number }
interface PendulumObj { x: number; y: number; vx: number; vy: number; length: number; amplitude: number; omega: number; phase: number; opacity: number }
interface ProjectileObj { ox: number; oy: number; vdx: number; vdy: number; vx: number; vy0: number; g: number; t: number; maxT: number; trail: {x:number;y:number}[]; opacity: number }

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let tick = 0;

    const setup = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * devicePixelRatio;
      canvas.height = h * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    setup();

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    // ── Atoms ──────────────────────────────────────────────────────────────
    const atoms: AtomObj[] = [
      { x: W()*0.12, y: H()*0.28, vx: 0.10, vy: 0.08, label: "H",  r: 6, opacity: 0.28,
        orbitals: [{ rx:34, ry:15, tilt:0.2,  speed:0.045, phase:0 }] },
      { x: W()*0.78, y: H()*0.20, vx:-0.09, vy: 0.11, label: "C",  r: 8, opacity: 0.24,
        orbitals: [{ rx:44, ry:22, tilt:0.3,  speed:0.030, phase:0 },
                   { rx:26, ry:44, tilt:1.2,  speed:0.025, phase:Math.PI }] },
      { x: W()*0.50, y: H()*0.72, vx: 0.07, vy:-0.09, label: "O",  r: 7, opacity: 0.26,
        orbitals: [{ rx:38, ry:18, tilt:-0.5, speed:0.036, phase:Math.PI/3 },
                   { rx:20, ry:38, tilt: 1.1, speed:0.028, phase:Math.PI }] },
      { x: W()*0.88, y: H()*0.62, vx:-0.11, vy:-0.07, label: "N",  r: 7, opacity: 0.22,
        orbitals: [{ rx:40, ry:20, tilt:0.8,  speed:0.040, phase:Math.PI/2 }] },
      { x: W()*0.35, y: H()*0.50, vx: 0.06, vy: 0.10, label: "Fe", r: 9, opacity: 0.20,
        orbitals: [{ rx:46, ry:23, tilt:0.5,  speed:0.022, phase:0 },
                   { rx:30, ry:46, tilt:-0.9, speed:0.018, phase:Math.PI/4 },
                   { rx:58, ry:15, tilt:1.5,  speed:0.028, phase:Math.PI }] },
    ];

    // ── Molecules ──────────────────────────────────────────────────────────
    const molecules: MolObj[] = [
      { x: W()*0.28, y: H()*0.14, vx: 0.09, vy: 0.07, center:"O", opacity:0.22,
        bonds:[{ dx:-26, dy:-18, label:"H" }, { dx:26, dy:-18, label:"H" }] },
      { x: W()*0.68, y: H()*0.82, vx:-0.07, vy:-0.09, center:"C", opacity:0.20,
        bonds:[{ dx:-38, dy:0, label:"O" }, { dx:38, dy:0, label:"O" }] },
      { x: W()*0.90, y: H()*0.42, vx:-0.10, vy: 0.06, center:"N", opacity:0.20,
        bonds:[{ dx:-26, dy:-22, label:"H" }, { dx:26, dy:-22, label:"H" }, { dx:0, dy:28, label:"H" }] },
      { x: W()*0.18, y: H()*0.75, vx: 0.08, vy:-0.06, center:"C", opacity:0.18,
        bonds:[{ dx:-28, dy:-20, label:"H" }, { dx:28, dy:-20, label:"H" },
               { dx:-20, dy: 26, label:"H" }, { dx:20, dy: 26, label:"H" }] },
    ];

    // ── Pendulums ──────────────────────────────────────────────────────────
    const pendulums: PendulumObj[] = [
      { x: W()*0.62, y: H()*0.08, vx:-0.06, vy:0.04, length:70, amplitude:0.55, omega:0.028, phase:0,         opacity:0.22 },
      { x: W()*0.22, y: H()*0.12, vx: 0.07, vy:0.05, length:48, amplitude:0.40, omega:0.038, phase:Math.PI/2, opacity:0.18 },
    ];

    // ── Projectiles ────────────────────────────────────────────────────────
    const makeMaxT = (vy0: number, g: number) => (-2 * vy0) / g;
    const projectiles: ProjectileObj[] = [
      { ox: W()*0.15, oy: H()*0.60, vdx:0.07, vdy:0.03,  vx:1.2,  vy0:-2.2, g:0.06, t:0, maxT:makeMaxT(-2.2,0.06), trail:[], opacity:0.24 },
      { ox: W()*0.70, oy: H()*0.45, vdx:-0.06, vdy:-0.04, vx:-1.0, vy0:-1.8, g:0.06, t:0, maxT:makeMaxT(-1.8,0.06), trail:[], opacity:0.20 },
    ];

    // ── Symbols ────────────────────────────────────────────────────────────
    const particles: Particle[] = Array.from({ length: 38 }, () => ({
      x: Math.random()*W(), y: Math.random()*H(),
      vx:(Math.random()-0.5)*0.28, vy:(Math.random()-0.5)*0.28,
      symbol: SYMBOLS[Math.floor(Math.random()*SYMBOLS.length)],
      size: Math.floor(Math.random()*10+10),
      opacity: Math.random()*0.14+0.08,
      rot: Math.random()*Math.PI*2,
      rotSpeed:(Math.random()-0.5)*0.004,
    }));

    const wrap = (obj:{x:number;y:number;vx:number;vy:number}, pad=80) => {
      const w=W(), h=H();
      if (obj.x<-pad) obj.x=w+pad; if (obj.x>w+pad) obj.x=-pad;
      if (obj.y<-pad) obj.y=h+pad; if (obj.y>h+pad) obj.y=-pad;
    };

    // ── Draw functions ─────────────────────────────────────────────────────
    const drawAtom = (a: AtomObj) => {
      const { x, y, label, r, orbitals, opacity } = a;
      for (const orb of orbitals) {
        ctx.save();
        ctx.translate(x,y); ctx.rotate(orb.tilt);
        ctx.beginPath();
        ctx.ellipse(0,0,orb.rx,orb.ry,0,0,Math.PI*2);
        ctx.strokeStyle=`rgba(255,255,255,${opacity*0.8})`; ctx.lineWidth=1;
        ctx.setLineDash([3,5]); ctx.stroke(); ctx.setLineDash([]);
        const ang = orb.phase + orb.speed*tick;
        ctx.beginPath();
        ctx.arc(orb.rx*Math.cos(ang), orb.ry*Math.sin(ang), 4,0,Math.PI*2);
        ctx.fillStyle=`rgba(242,118,48,${Math.min(opacity*2.5,1)})`; ctx.fill();
        ctx.restore();
      }
      ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,255,255,${opacity})`; ctx.fill();
      ctx.font=`bold ${r+2}px Georgia,serif`;
      ctx.fillStyle=`rgba(255,255,255,${opacity*2})`;
      ctx.textAlign="center"; ctx.textBaseline="middle";
      ctx.fillText(label,x,y);
    };

    const drawMolecule = (mol: MolObj) => {
      const { x, y, center, bonds, opacity } = mol;
      for (const bond of bonds) {
        ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+bond.dx,y+bond.dy);
        ctx.strokeStyle=`rgba(255,255,255,${opacity*0.9})`; ctx.lineWidth=1.2; ctx.stroke();
        ctx.beginPath(); ctx.arc(x+bond.dx,y+bond.dy,7,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,255,255,${opacity})`; ctx.fill();
        ctx.font="bold 8px Georgia,serif";
        ctx.fillStyle=`rgba(255,255,255,${opacity*2.5})`;
        ctx.textAlign="center"; ctx.textBaseline="middle";
        ctx.fillText(bond.label,x+bond.dx,y+bond.dy);
      }
      ctx.beginPath(); ctx.arc(x,y,10,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,255,255,${opacity})`; ctx.fill();
      ctx.font="bold 9px Georgia,serif";
      ctx.fillStyle=`rgba(255,255,255,${opacity*2.5})`;
      ctx.textAlign="center"; ctx.textBaseline="middle";
      ctx.fillText(center,x,y);
    };

    const drawPendulum = (pend: PendulumObj) => {
      const angle = pend.amplitude * Math.cos(pend.omega*tick + pend.phase);
      const bx = pend.x + pend.length*Math.sin(angle);
      const by = pend.y + pend.length*Math.cos(angle);
      // Arc of motion (ghost path)
      ctx.beginPath();
      ctx.arc(pend.x, pend.y, pend.length, Math.PI/2-pend.amplitude, Math.PI/2+pend.amplitude);
      ctx.strokeStyle=`rgba(255,255,255,${pend.opacity*0.25})`; ctx.lineWidth=0.8;
      ctx.setLineDash([2,6]); ctx.stroke(); ctx.setLineDash([]);
      // Pivot
      ctx.beginPath(); ctx.arc(pend.x,pend.y,3,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,255,255,${pend.opacity})`; ctx.fill();
      // String
      ctx.beginPath(); ctx.moveTo(pend.x,pend.y); ctx.lineTo(bx,by);
      ctx.strokeStyle=`rgba(255,255,255,${pend.opacity*0.8})`; ctx.lineWidth=1; ctx.stroke();
      // Bob
      ctx.beginPath(); ctx.arc(bx,by,6,0,Math.PI*2);
      ctx.fillStyle=`rgba(242,118,48,${Math.min(pend.opacity*1.8,1)})`; ctx.fill();
    };

    const drawProjectile = (proj: ProjectileObj, bx: number, by: number) => {
      // Trail
      for (let i=0; i<proj.trail.length; i++) {
        const fade = (i/proj.trail.length)*proj.opacity*0.7;
        const r = 1 + (i/proj.trail.length)*2;
        ctx.beginPath(); ctx.arc(proj.trail[i].x,proj.trail[i].y,r,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,255,255,${fade})`; ctx.fill();
      }
      // Ball
      ctx.beginPath(); ctx.arc(bx,by,5,0,Math.PI*2);
      ctx.fillStyle=`rgba(242,118,48,${proj.opacity})`; ctx.fill();
      // Velocity vector arrow
      const vAngle = Math.atan2(proj.vy0 + proj.g*proj.t, proj.vx);
      const vLen = 18;
      const ax = bx + Math.cos(vAngle)*vLen;
      const ay = by + Math.sin(vAngle)*vLen;
      ctx.beginPath(); ctx.moveTo(bx,by); ctx.lineTo(ax,ay);
      ctx.strokeStyle=`rgba(255,255,255,${proj.opacity*0.6})`; ctx.lineWidth=1; ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(ax,ay);
      ctx.lineTo(ax - 5*Math.cos(vAngle-0.4), ay - 5*Math.sin(vAngle-0.4));
      ctx.lineTo(ax - 5*Math.cos(vAngle+0.4), ay - 5*Math.sin(vAngle+0.4));
      ctx.closePath();
      ctx.fillStyle=`rgba(255,255,255,${proj.opacity*0.6})`; ctx.fill();
    };

    // ── Main loop ──────────────────────────────────────────────────────────
    const frame = () => {
      const w=W(), h=H();
      ctx.clearRect(0,0,w,h);
      tick++;

      for (const a of atoms)     { a.x+=a.vx; a.y+=a.vy; wrap(a); drawAtom(a); }
      for (const m of molecules) { m.x+=m.vx; m.y+=m.vy; wrap(m); drawMolecule(m); }

      for (const pend of pendulums) {
        pend.x+=pend.vx; pend.y+=pend.vy;
        wrap(pend, 100);
        drawPendulum(pend);
      }

      for (const proj of projectiles) {
        proj.ox+=proj.vdx; proj.oy+=proj.vdy;
        wrap({ x:proj.ox, y:proj.oy, vx:proj.vdx, vy:proj.vdy }, 120);
        proj.t+=0.35;
        if (proj.t > proj.maxT) { proj.t=0; proj.trail=[]; }
        const bx = proj.ox + proj.vx*proj.t;
        const by = proj.oy + proj.vy0*proj.t + 0.5*proj.g*proj.t*proj.t;
        proj.trail.push({x:bx, y:by});
        if (proj.trail.length>28) proj.trail.shift();
        drawProjectile(proj, bx, by);
      }

      for (const p of particles) {
        p.x+=p.vx; p.y+=p.vy; p.rot+=p.rotSpeed;
        wrap(p,60);
        ctx.save();
        ctx.translate(p.x,p.y); ctx.rotate(p.rot);
        ctx.font=`${p.size}px Georgia,serif`;
        ctx.fillStyle=`rgba(255,255,255,${p.opacity})`;
        ctx.textAlign="center"; ctx.textBaseline="middle";
        ctx.fillText(p.symbol,0,0);
        ctx.restore();
      }

      animId = requestAnimationFrame(frame);
    };

    frame();
    const ro = new ResizeObserver(setup);
    ro.observe(canvas);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full motion-reduce:hidden"
      aria-hidden="true"
    />
  );
}
