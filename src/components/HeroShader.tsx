import { useEffect, useRef, useState } from 'react';

const VERT = `attribute vec2 a_pos; void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`;

const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}
void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = uv * 3.0;
  float t = u_time * 0.05;
  float n = fbm(p + vec2(t, -t * 0.5));
  float n2 = fbm(p * 1.5 - vec2(t * 0.7, 0.0));
  float m = n * 0.65 + n2 * 0.35;

  vec3 ivory = vec3(0.976, 0.965, 0.941);
  vec3 beige = vec3(0.945, 0.925, 0.878);
  vec3 gold = vec3(0.890, 0.788, 0.537);

  vec3 col = mix(ivory, beige, smoothstep(0.3, 0.8, m));
  col = mix(col, gold, 0.16 * smoothstep(0.55, 0.95, m));
  col = mix(col, ivory, 0.35 * (1.0 - smoothstep(0.0, 0.5, uv.y)));

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function HeroShader() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (failed) return;
    const canvas = ref.current;
    if (!canvas) return;

    const graceful = () => setFailed(true); // cihaz WebGL bacarmır → səssiz silk fallback

    const gl = canvas.getContext('webgl', { antialias: false, depth: false, stencil: false, alpha: false });
    if (!gl) {
      graceful();
      return;
    }

    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      graceful();
    });

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        graceful();
        return null;
      }
      return sh;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      graceful();
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uTime = gl.getUniformLocation(prog, 'u_time');

    const resize = () => {
      const scale = 0.5;
      const w = Math.max(1, Math.floor(canvas.clientWidth * scale));
      const h = Math.max(1, Math.floor(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const draw = (time: number) => {
      resize();
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    resize();
    window.addEventListener('resize', resize);

    let raf = 0;
    const start = performance.now();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      draw(0);
    } else {
      const loop = (now: number) => {
        draw((now - start) / 1000);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [failed]);

  if (failed) return <div className="silk-fallback" aria-hidden="true" />;
  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}