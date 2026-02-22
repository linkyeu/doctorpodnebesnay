import { useEffect, useRef } from 'react';
import styles from './CourseHero.module.css';

/* ─── Types ─── */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  baseOpacity: number;
  layer: 0 | 1 | 2; // 0=bg, 1=mid, 2=fg
  glowRadius: number;
}

interface DataFlow {
  fromIdx: number;
  toIdx: number;
  progress: number; // 0→1
  speed: number;
  active: boolean;
}

interface ActivationWave {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  startTime: number;
}

interface SynapseFire {
  particleIdx: number;
  progress: number; // 0→1
  cascadeDepth: number;
  cascadeTargets: number[][]; // targets per depth level
  cascadeProgress: number[]; // progress for each depth
}

/* ─── Constants ─── */

const CYAN = { r: 0, g: 212, b: 255 };
const CONNECTION_DIST = 150;
const MAX_CONNECTIONS = 4;
const MOUSE_REPEL_DIST = 120;
const MOUSE_GLOW_DIST = 150;
const MAX_ACTIVE_FLOWS = 10;
const WAVE_DURATION = 800;
const WAVE_MAX_RADIUS = 200;
const SYNAPSE_INTERVAL_MIN = 2000;
const SYNAPSE_INTERVAL_MAX = 4000;

const LAYER_CONFIG = [
  { speed: 0.15, radiusMin: 1, radiusMax: 2, opacity: 0.15, glow: 8, countDesktop: 15, countMobile: 8 },
  { speed: 0.3, radiusMin: 2, radiusMax: 4, opacity: 0.35, glow: 15, countDesktop: 20, countMobile: 12 },
  { speed: 0.5, radiusMin: 3, radiusMax: 6, opacity: 0.7, glow: 22, countDesktop: 8, countMobile: 4 },
] as const;

/* ─── Helpers ─── */

function rgba(r: number, g: number, b: number, a: number) {
  return `rgba(${r},${g},${b},${a})`;
}

function distBetween(x1: number, y1: number, x2: number, y2: number) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/* ─── Component ─── */

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let animId = 0;
    let isVisible = true;
    let particles: Particle[] = [];
    const dataFlows: DataFlow[] = [];
    const activationWaves: ActivationWave[] = [];
    let synapseFire: SynapseFire | null = null;
    let width = 0;
    let height = 0;
    let mouseX = -1000;
    let mouseY = -1000;
    const isMobile = window.innerWidth < 768;
    let nextSynapseTime = performance.now() + SYNAPSE_INTERVAL_MIN + Math.random() * (SYNAPSE_INTERVAL_MAX - SYNAPSE_INTERVAL_MIN);

    // Hex grid
    const hexSize = isMobile ? 35 : 60;
    let hexPatternCanvas: HTMLCanvasElement | null = null;

    function resize() {
      const rect = container!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildHexPattern();
    }

    /* ─── Hex grid pattern (cached) ─── */

    function buildHexPattern() {
      const patternW = hexSize * 3;
      const patternH = hexSize * Math.sqrt(3);
      hexPatternCanvas = document.createElement('canvas');
      hexPatternCanvas.width = Math.ceil(patternW * dpr);
      hexPatternCanvas.height = Math.ceil(patternH * dpr);
      const pCtx = hexPatternCanvas.getContext('2d')!;
      pCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pCtx.strokeStyle = rgba(CYAN.r, CYAN.g, CYAN.b, 0.04);
      pCtx.lineWidth = 0.5;

      const h = hexSize * Math.sqrt(3) / 2;
      const offsets = [
        [0, 0],
        [hexSize * 1.5, h],
      ];

      for (const [ox, oy] of offsets) {
        pCtx.beginPath();
        for (let a = 0; a < 6; a++) {
          const angle = (Math.PI / 3) * a - Math.PI / 6;
          const px = ox + hexSize * Math.cos(angle);
          const py = oy + hexSize * Math.sin(angle);
          if (a === 0) pCtx.moveTo(px, py);
          else pCtx.lineTo(px, py);
        }
        pCtx.closePath();
        pCtx.stroke();
      }
    }

    let hexOffsetY = 0;

    function drawHexGrid() {
      if (!hexPatternCanvas) return;
      const pattern = ctx!.createPattern(hexPatternCanvas, 'repeat');
      if (!pattern) return;
      ctx!.save();
      ctx!.translate(0, hexOffsetY % (hexSize * Math.sqrt(3)));
      ctx!.fillStyle = pattern;
      ctx!.fillRect(-hexSize * 2, -hexSize * 2, width + hexSize * 4, height + hexSize * 4);
      ctx!.restore();
    }

    /* ─── Init particles ─── */

    function initParticles() {
      particles = [];
      for (let layer = 0; layer < 3; layer++) {
        const cfg = LAYER_CONFIG[layer];
        const count = isMobile ? cfg.countMobile : cfg.countDesktop;
        for (let i = 0; i < count; i++) {
          const r = cfg.radiusMin + Math.random() * (cfg.radiusMax - cfg.radiusMin);
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * cfg.speed * 2,
            vy: (Math.random() - 0.5) * cfg.speed * 2,
            radius: r,
            opacity: cfg.opacity,
            baseOpacity: cfg.opacity,
            layer: layer as 0 | 1 | 2,
            glowRadius: cfg.glow,
          });
        }
      }
    }

    /* ─── Find connections for a particle ─── */

    function getConnections(idx: number): number[] {
      const p = particles[idx];
      const connections: { j: number; d: number }[] = [];
      for (let j = 0; j < particles.length; j++) {
        if (j === idx) continue;
        const d = distBetween(p.x, p.y, particles[j].x, particles[j].y);
        if (d < CONNECTION_DIST) {
          connections.push({ j, d });
        }
      }
      connections.sort((a, b) => a.d - b.d);
      return connections.slice(0, MAX_CONNECTIONS).map((c) => c.j);
    }

    /* ─── Data flow management ─── */

    function maybeSpawnFlow(fromIdx: number, toIdx: number) {
      const activeCount = dataFlows.filter((f) => f.active).length;
      if (activeCount >= MAX_ACTIVE_FLOWS) return;
      if (Math.random() > 0.005) return;

      const exists = dataFlows.some(
        (f) => f.active && ((f.fromIdx === fromIdx && f.toIdx === toIdx) || (f.fromIdx === toIdx && f.toIdx === fromIdx))
      );
      if (exists) return;

      dataFlows.push({
        fromIdx,
        toIdx,
        progress: 0,
        speed: 0.008 + Math.random() * 0.008,
        active: true,
      });
    }

    function updateFlows() {
      for (let i = dataFlows.length - 1; i >= 0; i--) {
        const f = dataFlows[i];
        if (!f.active) continue;
        f.progress += f.speed;
        if (f.progress >= 1) {
          dataFlows.splice(i, 1);
        }
      }
    }

    function drawFlows() {
      for (const f of dataFlows) {
        if (!f.active) continue;
        const from = particles[f.fromIdx];
        const to = particles[f.toIdx];
        if (!from || !to) continue;
        const x = lerp(from.x, to.x, f.progress);
        const y = lerp(from.y, to.y, f.progress);

        ctx!.save();
        ctx!.shadowBlur = 8;
        ctx!.shadowColor = rgba(CYAN.r, 220, CYAN.b, 0.6);
        ctx!.beginPath();
        ctx!.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx!.fillStyle = rgba(CYAN.r, 220, CYAN.b, 0.8);
        ctx!.fill();
        ctx!.restore();
      }
    }

    /* ─── Activation waves (desktop click) ─── */

    function spawnWave(x: number, y: number) {
      activationWaves.push({ x, y, radius: 0, opacity: 0.15, startTime: performance.now() });
    }

    function updateAndDrawWaves(now: number) {
      for (let i = activationWaves.length - 1; i >= 0; i--) {
        const w = activationWaves[i];
        const elapsed = now - w.startTime;
        if (elapsed > WAVE_DURATION) {
          activationWaves.splice(i, 1);
          continue;
        }
        const t = elapsed / WAVE_DURATION;
        w.radius = t * WAVE_MAX_RADIUS;
        w.opacity = 0.15 * (1 - t);

        ctx!.beginPath();
        ctx!.arc(w.x, w.y, w.radius, 0, Math.PI * 2);
        ctx!.strokeStyle = rgba(CYAN.r, CYAN.g, CYAN.b, w.opacity);
        ctx!.lineWidth = 2 * (1 - t);
        ctx!.stroke();
      }
    }

    /* ─── Synapse firing ─── */

    function triggerSynapse() {
      const fgIndices = particles.map((p, i) => (p.layer === 2 ? i : -1)).filter((i) => i >= 0);
      if (fgIndices.length === 0) return;
      const startIdx = fgIndices[Math.floor(Math.random() * fgIndices.length)];

      const depth = 2 + Math.floor(Math.random() * 2);
      const cascadeTargets: number[][] = [];
      const visited = new Set<number>([startIdx]);

      let currentLevel = [startIdx];
      for (let d = 0; d < depth; d++) {
        const nextLevel: number[] = [];
        for (const idx of currentLevel) {
          const conns = getConnections(idx);
          for (const c of conns) {
            if (!visited.has(c)) {
              visited.add(c);
              nextLevel.push(c);
            }
          }
        }
        if (nextLevel.length === 0) break;
        cascadeTargets.push(nextLevel);
        currentLevel = nextLevel;
      }

      if (cascadeTargets.length === 0) return;

      synapseFire = {
        particleIdx: startIdx,
        progress: 0,
        cascadeDepth: cascadeTargets.length,
        cascadeTargets,
        cascadeProgress: new Array(cascadeTargets.length).fill(0) as number[],
      };
    }

    function updateSynapse(dt: number) {
      if (!synapseFire) return;
      synapseFire.progress += dt * 0.003;

      for (let d = 0; d < synapseFire.cascadeDepth; d++) {
        const delayT = (d + 1) * 0.45;
        if (synapseFire.progress > delayT) {
          synapseFire.cascadeProgress[d] = Math.min(1, (synapseFire.progress - delayT) * 2);
        }
      }

      const lastProgress = synapseFire.cascadeProgress[synapseFire.cascadeDepth - 1];
      if (lastProgress >= 1) {
        synapseFire = null;
      }
    }

    function getSynapseGlow(idx: number): number {
      if (!synapseFire) return 0;
      if (idx === synapseFire.particleIdx) {
        return Math.max(0, 1 - synapseFire.progress * 2) * 0.8;
      }
      for (let d = 0; d < synapseFire.cascadeDepth; d++) {
        if (synapseFire.cascadeTargets[d].includes(idx)) {
          const p = synapseFire.cascadeProgress[d];
          return Math.sin(p * Math.PI) * 0.6;
        }
      }
      return 0;
    }

    /* ─── Static frame for reduced motion ─── */

    function drawStaticFrame() {
      ctx!.clearRect(0, 0, width, height);
      drawHexGrid();

      for (let i = 0; i < particles.length; i++) {
        let connections = 0;
        for (let j = i + 1; j < particles.length; j++) {
          if (connections >= MAX_CONNECTIONS) break;
          const d = distBetween(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
          if (d < CONNECTION_DIST) {
            const alpha = (1 - d / CONNECTION_DIST) * 0.12;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = rgba(CYAN.r, CYAN.g, CYAN.b, alpha);
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
            connections++;
          }
        }
      }

      for (const p of particles) {
        ctx!.save();
        ctx!.shadowBlur = p.glowRadius * 0.6;
        ctx!.shadowColor = rgba(CYAN.r, CYAN.g, CYAN.b, p.opacity * 0.3);
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = rgba(CYAN.r, CYAN.g, CYAN.b, p.opacity);
        ctx!.fill();
        ctx!.restore();
      }
    }

    /* ─── Main animation loop ─── */

    let lastTime = 0;

    function animate(now: number) {
      if (!isVisible) {
        animId = requestAnimationFrame(animate);
        return;
      }

      const dt = lastTime ? Math.min(now - lastTime, 32) : 16;
      lastTime = now;

      ctx!.clearRect(0, 0, width, height);

      // Hex grid drift
      hexOffsetY += 0.1;
      drawHexGrid();

      // Synapse timing
      if (now > nextSynapseTime && !synapseFire) {
        triggerSynapse();
        nextSynapseTime = now + SYNAPSE_INTERVAL_MIN + Math.random() * (SYNAPSE_INTERVAL_MAX - SYNAPSE_INTERVAL_MIN);
      }
      updateSynapse(dt);

      // Update particles
      for (const p of particles) {
        const layerSpeed = LAYER_CONFIG[p.layer].speed;
        p.x += p.vx * layerSpeed * 3;
        p.y += p.vy * layerSpeed * 3;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));

        // Mouse interaction (desktop)
        if (!isMobile) {
          const d = distBetween(p.x, p.y, mouseX, mouseY);

          if (d < MOUSE_REPEL_DIST && d > 0) {
            const force = ((MOUSE_REPEL_DIST - d) / MOUSE_REPEL_DIST) * 0.02;
            p.vx += ((p.x - mouseX) / d) * force;
            p.vy += ((p.y - mouseY) / d) * force;
          }

          if (d < MOUSE_GLOW_DIST) {
            const glowFactor = 1 + (1 - d / MOUSE_GLOW_DIST);
            p.opacity = Math.min(1, p.baseOpacity * glowFactor);
          } else {
            p.opacity = p.baseOpacity;
          }
        }

        p.vx *= 0.999;
        p.vy *= 0.999;
      }

      // Draw connections + spawn flows
      for (let i = 0; i < particles.length; i++) {
        let connections = 0;
        for (let j = i + 1; j < particles.length; j++) {
          if (connections >= MAX_CONNECTIONS) break;
          const d = distBetween(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
          if (d < CONNECTION_DIST) {
            const alpha = (1 - d / CONNECTION_DIST) * 0.12;
            const synapseAlphaI = getSynapseGlow(i);
            const synapseAlphaJ = getSynapseGlow(j);
            const synapseBoost = Math.max(synapseAlphaI, synapseAlphaJ);
            const finalAlpha = alpha + synapseBoost * 0.3;

            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = rgba(CYAN.r, CYAN.g, CYAN.b, finalAlpha);
            ctx!.lineWidth = synapseBoost > 0 ? 1 : 0.5;
            ctx!.stroke();

            maybeSpawnFlow(i, j);
            connections++;
          }
        }
      }

      updateFlows();
      drawFlows();

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const synapseGlow = getSynapseGlow(i);
        const totalOpacity = Math.min(1, p.opacity + synapseGlow);
        const totalGlow = p.glowRadius + synapseGlow * 25;

        ctx!.save();
        ctx!.shadowBlur = totalGlow;
        ctx!.shadowColor = rgba(CYAN.r, CYAN.g, CYAN.b, totalOpacity * 0.4);
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius + synapseGlow * 3, 0, Math.PI * 2);
        ctx!.fillStyle = rgba(CYAN.r, CYAN.g, CYAN.b, totalOpacity);
        ctx!.fill();
        ctx!.restore();
      }

      updateAndDrawWaves(now);

      animId = requestAnimationFrame(animate);
    }

    // IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    // Mouse tracking (desktop)
    function handleMouseMove(e: MouseEvent) {
      if (isMobile) return;
      const rect = canvas!.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }

    function handleMouseLeave() {
      mouseX = -1000;
      mouseY = -1000;
      for (const p of particles) {
        p.opacity = p.baseOpacity;
      }
    }

    function handleClick(e: MouseEvent) {
      if (isMobile) return;
      const rect = canvas!.getBoundingClientRect();
      spawnWave(e.clientX - rect.left, e.clientY - rect.top);
    }

    // Init
    resize();
    initParticles();

    if (motionQuery.matches) {
      drawStaticFrame();
    } else {
      animId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.particleContainer} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.particleCanvas} />
    </div>
  );
}
