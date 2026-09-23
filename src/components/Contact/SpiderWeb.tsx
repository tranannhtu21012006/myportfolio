'use client';

import { useRef, useEffect, useCallback } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Node extends Point {
  id: number;
  ring: number;
  radial: number;
}

export default function SpiderWeb({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const hasStarted = useRef(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.parentElement?.getBoundingClientRect();
    if (!rect) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = rect.height;
    const cx = W / 2;
    const cy = H / 2;

    const NUM_RADIALS = 14;
    const NUM_RINGS = 10;
    const MAX_RADIUS = Math.max(W, H) * 0.48;
    const LINE_COLOR = 'rgba(255, 255, 255, 0.1)';
    const BRIGHT_COLOR = 'rgba(255, 255, 255, 0.2)';
    const WEB_WIDTH = 1.5;

    // 1. Build Graph Nodes
    const nodes: Node[] = [];
    const radialAngles: number[] = [];
    for (let i = 0; i < NUM_RADIALS; i++) {
      radialAngles.push((i / NUM_RADIALS) * Math.PI * 2 - Math.PI / 2);
    }

    nodes.push({ id: 0, x: cx, y: cy, ring: 0, radial: -1 });

    for (let s = 1; s <= NUM_RINGS; s++) {
      const radius = (s / NUM_RINGS) * MAX_RADIUS;
      for (let r = 0; r < NUM_RADIALS; r++) {
        const angle = radialAngles[r];
        const wobble = 1 + Math.sin(r * 2.7 + s * 1.8) * 0.06;
        nodes.push({
          id: nodes.length,
          x: cx + Math.cos(angle) * radius * wobble,
          y: cy + Math.sin(angle) * radius * wobble,
          ring: s,
          radial: r
        });
      }
    }

    // 2. Build Adjacency List
    const adj: number[][] = Array.from({ length: nodes.length }, () => []);

    for (let r = 0; r < NUM_RADIALS; r++) {
      adj[0].push(r + 1);
      adj[r + 1].push(0);
    }

    for (let s = 1; s <= NUM_RINGS; s++) {
      for (let r = 0; r < NUM_RADIALS; r++) {
        const currId = (s - 1) * NUM_RADIALS + r + 1;
        
        // Outward radial edge
        if (s < NUM_RINGS) {
          const outId = s * NUM_RADIALS + r + 1;
          adj[currId].push(outId);
          adj[outId].push(currId);
        }
        
        // Circular ring edge
        const nextR = (r + 1) % NUM_RADIALS;
        const nextId = (s - 1) * NUM_RADIALS + nextR + 1;
        adj[currId].push(nextId);
        adj[nextId].push(currId);
      }
    }

    // 3. Dijkstra's Algorithm
    function findShortestPath(startId: number, targetId: number): number[] {
      const dist = new Array(nodes.length).fill(Infinity);
      const prev = new Array(nodes.length).fill(-1);
      dist[startId] = 0;
      
      const q = new Set(nodes.map(n => n.id));
      
      while (q.size > 0) {
        let u = -1;
        let minDist = Infinity;
        for (const id of q) {
          if (dist[id] < minDist) {
            minDist = dist[id];
            u = id;
          }
        }
        if (u === -1 || u === targetId) break;
        q.delete(u);
        
        for (const v of adj[u]) {
          if (!q.has(v)) continue;
          const d = Math.hypot(nodes[u].x - nodes[v].x, nodes[u].y - nodes[v].y);
          const alt = dist[u] + d;
          if (alt < dist[v]) {
            dist[v] = alt;
            prev[v] = u;
          }
        }
      }
      
      const path = [];
      let curr = targetId;
      while (curr !== -1) {
        path.unshift(curr);
        curr = prev[curr];
      }
      return path;
    }

    // State Variables
    const SPEED = 0.08; // pixels per ms
    const REST_NODE_ID = NUM_RINGS * NUM_RADIALS; // Top right node approx
    let spiderNodeId = REST_NODE_ID;
    let spiderPos: Point = { x: nodes[spiderNodeId].x, y: nodes[spiderNodeId].y };
    let spiderAngle = Math.PI * 0.15;
    let totalDistanceTraveled = 0;
    
    let state: 'IDLE' | 'CHASING' | 'RETURNING' = 'IDLE';
    let path: number[] = [];
    let activePreyId: number | null = null;
    let lastPreyAteTime = 0;
    let nextPreySpawnDelay = 3000 + Math.random() * 4000;

    // Stylized Spider
    function drawSpider(ctx: CanvasRenderingContext2D, pos: Point, angle: number, distT: number) {
      ctx.save();
      ctx.translate(pos.x, pos.y);
      ctx.rotate(angle);

      const bodyColor = '#9333ea';
      const headColor = '#c084fc';
      const legColor = '#d8b4fe';

      const walkCycle = distT * 0.15;
      const swing1 = Math.sin(walkCycle) * 5;
      const swing2 = Math.sin(walkCycle + Math.PI) * 5;

      ctx.strokeStyle = legColor;
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';

      ctx.beginPath();
      ctx.moveTo(-3, -2); ctx.lineTo(-12, -8 + swing1); ctx.lineTo(-18, -2 + swing1);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(3, -2); ctx.lineTo(12, -8 + swing2); ctx.lineTo(18, -2 + swing2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-3, 2); ctx.lineTo(-12, 8 + swing2); ctx.lineTo(-16, 14 + swing2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(3, 2); ctx.lineTo(12, 8 + swing1); ctx.lineTo(16, 14 + swing1);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -6, 5, 0, Math.PI * 2);
      ctx.fillStyle = headColor;
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(0, 4, 7, 9, 0, 0, Math.PI * 2);
      ctx.fillStyle = bodyColor;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(-2, -8, 1.5, 0, Math.PI * 2);
      ctx.arc(2, -8, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.restore();
    }

    const distPoint = (p1: Point, p2: Point) => Math.hypot(p2.x - p1.x, p2.y - p1.y);

    let lastTime = performance.now();

    function animate(timestamp: number) {
      const dt = timestamp - lastTime;
      lastTime = timestamp;

      ctx.clearRect(0, 0, W, H);

      // Prey Spawning Logic
      if (activePreyId === null) {
        if (timestamp - lastPreyAteTime > nextPreySpawnDelay) {
          // Spawn new prey (avoid center and rest node)
          do {
            activePreyId = Math.floor(Math.random() * (nodes.length - 1)) + 1;
          } while (activePreyId === REST_NODE_ID);
          
          // Re-calculate path immediately if idle or returning
          if (state === 'IDLE' || state === 'RETURNING') {
            state = 'CHASING';
            // Start path from the node the spider is currently heading towards, or current node
            let startId = spiderNodeId;
            if (path.length > 0) {
              startId = path[0]; // If mid-edge, finish edge then go to prey
            }
            const newPath = findShortestPath(startId, activePreyId);
            // If mid-edge, prepend current destination to new path
            if (path.length > 0 && path[0] !== newPath[0]) {
               path = [path[0], ...newPath.slice(1)];
            } else {
               path = newPath;
            }
          }
        }
      }

      // Draw Web with Vibration
      ctx.lineWidth = WEB_WIDTH;
      const drawnEdges = new Set<string>();

      for (let u = 0; u < nodes.length; u++) {
        for (const v of adj[u]) {
          const edgeId = u < v ? `${u}-${v}` : `${v}-${u}`;
          if (drawnEdges.has(edgeId)) continue;
          drawnEdges.add(edgeId);

          let p1 = { ...nodes[u] };
          let p2 = { ...nodes[v] };

          // Vibration effect if connected to active prey
          if (activePreyId !== null) {
            const VIBE_AMP = 3.5;
            const VIBE_FREQ = 0.05;
            if (u === activePreyId) {
              p1.x += Math.sin(timestamp * VIBE_FREQ) * VIBE_AMP;
              p1.y += Math.cos(timestamp * VIBE_FREQ * 1.2) * VIBE_AMP;
            }
            if (v === activePreyId) {
              p2.x += Math.sin(timestamp * VIBE_FREQ) * VIBE_AMP;
              p2.y += Math.cos(timestamp * VIBE_FREQ * 1.2) * VIBE_AMP;
            }
          }

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = (u === 0 || v === 0) ? BRIGHT_COLOR : LINE_COLOR;
          ctx.stroke();
        }
      }

      // Draw Prey
      if (activePreyId !== null) {
        const preyNode = nodes[activePreyId];
        const VIBE_AMP = 3.5;
        const VIBE_FREQ = 0.05;
        const px = preyNode.x + Math.sin(timestamp * VIBE_FREQ) * VIBE_AMP;
        const py = preyNode.y + Math.cos(timestamp * VIBE_FREQ * 1.2) * VIBE_AMP;

        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#00ffd5';
        ctx.fill();
        ctx.shadowColor = '#00ffd5';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      // Spider Movement Logic
      if (path.length > 0) {
        const targetNodeId = path[0];
        const targetNode = nodes[targetNodeId];
        const dist = distPoint(spiderPos, targetNode);
        const moveStep = SPEED * dt;

        if (dist <= moveStep) {
          // Reached node
          spiderPos = { x: targetNode.x, y: targetNode.y };
          spiderNodeId = targetNodeId;
          path.shift();

          if (path.length === 0) {
            if (state === 'CHASING') {
              // Ate the prey
              activePreyId = null;
              lastPreyAteTime = timestamp;
              nextPreySpawnDelay = 2000 + Math.random() * 3000;
              
              // Plan return trip
              state = 'RETURNING';
              path = findShortestPath(spiderNodeId, REST_NODE_ID);
            } else if (state === 'RETURNING') {
              state = 'IDLE';
            }
          }
        } else {
          // Move towards target
          const dx = targetNode.x - spiderPos.x;
          const dy = targetNode.y - spiderPos.y;
          spiderAngle = Math.atan2(dy, dx) + Math.PI / 2;
          spiderPos.x += (dx / dist) * moveStep;
          spiderPos.y += (dy / dist) * moveStep;
          totalDistanceTraveled += moveStep;
        }
      } else {
        // IDLE wiggle
        if (state === 'IDLE') {
           spiderAngle = Math.PI * 0.15 + Math.sin(timestamp * 0.001) * 0.05;
        }
      }

      // Draw Spider
      drawSpider(ctx, spiderPos, spiderAngle, totalDistanceTraveled);

      animationRef.current = requestAnimationFrame(animate);
    }

    lastTime = performance.now();
    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          draw();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
