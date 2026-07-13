import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import './HeroPlanet.css';

/* ---------------- Earth ---------------- */

const EARTH_VERT = `
  varying vec2 vUv;
  varying vec3 vNormal;
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const EARTH_FRAG = `
  uniform float uDay;
  uniform sampler2D uDayMap;
  uniform sampler2D uNightMap;
  uniform vec3 uLightDir;
  varying vec2 vUv;
  varying vec3 vNormal;

  vec3 saturate(vec3 c, float amt) {
    float l = dot(c, vec3(0.299, 0.587, 0.114));
    return mix(vec3(l), c, amt);
  }

  vec3 posterize(vec3 c, float levels) {
    return floor(c * levels) / levels;
  }

  void main() {
    vec3 raw = texture2D(uDayMap, vUv).rgb;

    // Stylize: detect ocean (blue-dominant) vs land, snap to cartoon palette
    float blueness = raw.b - max(raw.r, raw.g);
    float oceanMask = smoothstep(-0.05, 0.05, blueness);

    // ocean cartoon palette
    vec3 oceanDeep    = vec3(0.10, 0.36, 0.65);
    vec3 oceanShallow = vec3(0.25, 0.62, 0.86);
    float oceanShade  = smoothstep(0.15, 0.42, raw.b);
    vec3 ocean = mix(oceanDeep, oceanShallow, oceanShade);

    // land cartoon palette — greens with a touch of sand on bright spots
    float greenness = raw.g - 0.5 * (raw.r + raw.b);
    float dryness   = clamp(raw.r - raw.g, 0.0, 1.0);
    vec3 forest = vec3(0.16, 0.42, 0.22);
    vec3 grass  = vec3(0.34, 0.66, 0.32);
    vec3 sand   = vec3(0.80, 0.72, 0.45);
    vec3 land   = mix(forest, grass, smoothstep(0.0, 0.18, greenness));
    land        = mix(land, sand, smoothstep(0.05, 0.30, dryness));

    // snow caps from brightness
    float bright = max(raw.r, max(raw.g, raw.b));
    vec3 snowy = mix(land, vec3(0.95, 0.96, 1.0), smoothstep(0.78, 0.92, bright));

    vec3 dayCol = mix(snowy, ocean, oceanMask);
    dayCol = saturate(dayCol, 1.15);
    dayCol = posterize(dayCol, 6.0);

    // cel-shaded lighting — 3 hard steps
    float lit = dot(normalize(vNormal), normalize(uLightDir));
    float celA = step(0.55, lit);
    float celB = step(0.10, lit);
    float celC = step(-0.20, lit);
    float celShade = 0.30 + celC * 0.20 + celB * 0.25 + celA * 0.25;

    vec3 daylit = dayCol * celShade;

    // night side — city lights texture
    vec3 nightCol = texture2D(uNightMap, vUv).rgb;
    vec3 nightGlow = nightCol * 1.6 + dayCol * 0.05;

    float dayMask = smoothstep(-0.18, 0.18, lit);
    vec3 lightTheme = mix(nightGlow, daylit, dayMask);
    vec3 darkTheme  = mix(nightGlow * 1.4, daylit * 0.55, dayMask);

    vec3 final = mix(darkTheme, lightTheme, uDay);
    gl_FragColor = vec4(final, 1.0);
  }
`;

const ATMO_VERT = `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const ATMO_FRAG = `
  uniform float uDay;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    float rim = 1.0 - max(dot(vNormal, vViewDir), 0.0);
    rim = pow(rim, 2.0);
    vec3 dayAtmo = vec3(0.42, 0.70, 1.0);
    vec3 nightAtmo = vec3(0.20, 0.30, 0.65);
    vec3 col = mix(nightAtmo, dayAtmo, uDay);
    gl_FragColor = vec4(col, rim * 0.8);
  }
`;

function Earth({ theme }) {
  const groupRef = useRef();
  const cloudsRef = useRef();
  const earthMatRef = useRef();
  const atmoMatRef = useRef();
  const targetDay = theme === 'light' ? 1 : 0;

  const [dayMap, nightMap, cloudsMap] = useTexture([
    '/earth_atmos_2048.jpg',
    '/earth_lights_2048.png',
    '/earth_clouds_1024.png',
  ]);

  useEffect(() => {
    [dayMap, nightMap].forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
      t.needsUpdate = true;
    });
    cloudsMap.anisotropy = 8;
  }, [dayMap, nightMap, cloudsMap]);

  const lightDir = useMemo(() => new THREE.Vector3(1.4, 0.4, 0.7).normalize(), []);

  useFrame((_, dt) => {
    if (groupRef.current) groupRef.current.rotation.y += dt * 0.07;
    if (cloudsRef.current) cloudsRef.current.rotation.y += dt * 0.025;
    if (earthMatRef.current) {
      earthMatRef.current.uniforms.uDay.value = THREE.MathUtils.lerp(
        earthMatRef.current.uniforms.uDay.value,
        targetDay,
        0.05,
      );
    }
    if (atmoMatRef.current) {
      atmoMatRef.current.uniforms.uDay.value = THREE.MathUtils.lerp(
        atmoMatRef.current.uniforms.uDay.value,
        targetDay,
        0.05,
      );
    }
  });

  return (
    <group position={[0, -1.45, 0]}>
      <group ref={groupRef}>
        <mesh>
          <sphereGeometry args={[2, 128, 128]} />
          <shaderMaterial
            ref={earthMatRef}
            vertexShader={EARTH_VERT}
            fragmentShader={EARTH_FRAG}
            uniforms={{
              uDay: { value: targetDay },
              uDayMap: { value: dayMap },
              uNightMap: { value: nightMap },
              uLightDir: { value: lightDir },
            }}
          />
        </mesh>
        <Plants />
      </group>
      <mesh ref={cloudsRef} scale={1.012}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial
          map={cloudsMap}
          transparent
          opacity={0.55}
          depthWrite={false}
          color="#ffffff"
        />
      </mesh>
      <mesh scale={1.06}>
        <sphereGeometry args={[2, 48, 48]} />
        <shaderMaterial
          ref={atmoMatRef}
          vertexShader={ATMO_VERT}
          fragmentShader={ATMO_FRAG}
          uniforms={{ uDay: { value: targetDay } }}
          transparent
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ---------------- Foliage on top cap ---------------- */

function Plants() {
  const items = useMemo(() => {
    const types = ['pine', 'bush', 'flower', 'succulent', 'leaf'];
    const arr = [];
    // distribute around the top cap (roughly within 50° of north pole)
    const count = 28;
    for (let i = 0; i < count; i++) {
      // golden-angle distribution to avoid clumping
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      const idx = i / count;
      const y = 1 - idx * 0.42; // y in [0.58, 1] — top cap only
      const r = Math.sqrt(1 - y * y);
      const theta = i * goldenAngle;
      const R = 2.0;
      arr.push({
        position: [R * r * Math.cos(theta), R * y, R * r * Math.sin(theta)],
        scale: 0.18 + Math.random() * 0.22,
        type: types[i % types.length],
        spin: Math.random() * Math.PI * 2,
        colorSeed: Math.random(),
      });
    }
    return arr;
  }, []);

  return (
    <group>
      {items.map((p, i) => (
        <Plant key={i} {...p} />
      ))}
    </group>
  );
}

function Plant({ position, scale, type, spin, colorSeed }) {
  const ref = useRef();
  useEffect(() => {
    if (!ref.current) return;
    // orient so local +Y points radially outward from origin
    const up = new THREE.Vector3(...position).normalize();
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), up);
    ref.current.quaternion.copy(q);
    ref.current.rotateY(spin);
  }, [position, spin]);

  return (
    <group ref={ref} position={position} scale={scale}>
      {type === 'pine' && <PineTree seed={colorSeed} />}
      {type === 'bush' && <Bush seed={colorSeed} />}
      {type === 'flower' && <Flower seed={colorSeed} />}
      {type === 'succulent' && <Succulent seed={colorSeed} />}
      {type === 'leaf' && <BigLeaf seed={colorSeed} />}
    </group>
  );
}

function PineTree({ seed }) {
  const tone = 0.85 + seed * 0.3;
  const c1 = new THREE.Color('#1c7a3a').multiplyScalar(tone);
  const c2 = new THREE.Color('#2a9a4a').multiplyScalar(tone);
  const c3 = new THREE.Color('#36b558').multiplyScalar(tone);
  return (
    <group>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 0.16, 6]} />
        <meshStandardMaterial color="#5c3a1e" roughness={1} />
      </mesh>
      <mesh position={[0, 0.28, 0]}>
        <coneGeometry args={[0.22, 0.45, 7]} />
        <meshStandardMaterial color={c1} flatShading roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.52, 0]}>
        <coneGeometry args={[0.16, 0.36, 7]} />
        <meshStandardMaterial color={c2} flatShading roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.74, 0]}>
        <coneGeometry args={[0.1, 0.26, 7]} />
        <meshStandardMaterial color={c3} flatShading roughness={0.9} />
      </mesh>
    </group>
  );
}

function Bush({ seed }) {
  const tone = 0.9 + seed * 0.3;
  const c = new THREE.Color('#2f9647').multiplyScalar(tone);
  const c2 = new THREE.Color('#3eb056').multiplyScalar(tone);
  return (
    <group position={[0, 0.18, 0]}>
      <mesh>
        <icosahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial color={c} flatShading roughness={0.95} />
      </mesh>
      <mesh position={[0.18, 0.1, -0.05]}>
        <icosahedronGeometry args={[0.14, 0]} />
        <meshStandardMaterial color={c2} flatShading roughness={0.95} />
      </mesh>
      <mesh position={[-0.14, 0.05, 0.1]}>
        <icosahedronGeometry args={[0.12, 0]} />
        <meshStandardMaterial color={c2} flatShading roughness={0.95} />
      </mesh>
    </group>
  );
}

function Flower({ seed }) {
  const palette = ['#ec4899', '#f59e0b', '#facc15', '#f87171', '#a855f7', '#fb7185'];
  const petal = palette[Math.floor(seed * palette.length) % palette.length];
  return (
    <group>
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.018, 0.022, 0.36, 6]} />
        <meshStandardMaterial color="#2f7d3f" roughness={0.9} />
      </mesh>
      {/* small leaves on stem */}
      <mesh position={[0.05, 0.18, 0]} rotation={[0, 0, -0.6]}>
        <coneGeometry args={[0.04, 0.12, 5]} />
        <meshStandardMaterial color="#3aa257" flatShading />
      </mesh>
      {/* petals */}
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 0.08, 0.38, Math.sin(a) * 0.08]}
            rotation={[0, a, 0]}
          >
            <sphereGeometry args={[0.06, 6, 6]} />
            <meshStandardMaterial
              color={petal}
              emissive={petal}
              emissiveIntensity={0.15}
              roughness={0.7}
            />
          </mesh>
        );
      })}
      {/* center */}
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.05, 8, 6]} />
        <meshStandardMaterial color="#fde68a" />
      </mesh>
    </group>
  );
}

function Succulent({ seed }) {
  const tone = 0.85 + seed * 0.4;
  const c = new THREE.Color('#5fb568').multiplyScalar(tone);
  const c2 = new THREE.Color('#7dc97f').multiplyScalar(tone);
  const leaves = 7;
  return (
    <group position={[0, 0.05, 0]}>
      {/* outer ring */}
      {Array.from({ length: leaves }, (_, i) => {
        const a = (i / leaves) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 0.06, 0.1, Math.sin(a) * 0.06]}
            rotation={[Math.cos(a) * 0.4, a, Math.sin(a) * 0.4]}
          >
            <coneGeometry args={[0.05, 0.2, 5]} />
            <meshStandardMaterial color={c} flatShading roughness={0.9} />
          </mesh>
        );
      })}
      {/* inner ring */}
      {Array.from({ length: 5 }, (_, i) => {
        const a = (i / 5) * Math.PI * 2 + 0.3;
        return (
          <mesh
            key={`in-${i}`}
            position={[Math.cos(a) * 0.03, 0.16, Math.sin(a) * 0.03]}
            rotation={[Math.cos(a) * 0.2, a, Math.sin(a) * 0.2]}
          >
            <coneGeometry args={[0.035, 0.16, 5]} />
            <meshStandardMaterial color={c2} flatShading roughness={0.9} />
          </mesh>
        );
      })}
    </group>
  );
}

function BigLeaf({ seed }) {
  // tropical broadleaf — flat plane with a leaf shape via vertex deformation
  const tone = 0.85 + seed * 0.35;
  const c = new THREE.Color('#2ea44f').multiplyScalar(tone);
  return (
    <group>
      <mesh position={[0, 0.16, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.012, 0.014, 0.32, 5]} />
        <meshStandardMaterial color="#3b6b2f" roughness={0.9} />
      </mesh>
      <mesh position={[0.0, 0.36, 0]} rotation={[Math.PI / 2.6, 0, 0]} scale={[0.4, 0.55, 1]}>
        <sphereGeometry args={[0.36, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={c} side={THREE.DoubleSide} roughness={0.9} flatShading />
      </mesh>
    </group>
  );
}

/* ---------------- Scene root ---------------- */

export default function HeroPlanet({ theme = 'light' }) {
  return (
    <div className="hero-planet" aria-hidden>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.25, 5.4], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={theme === 'light' ? 0.55 : 0.2} />
        <directionalLight
          position={theme === 'light' ? [5, 3, 4] : [-3, 2, 3]}
          intensity={theme === 'light' ? 1.0 : 0.45}
          color={theme === 'light' ? '#fff8e1' : '#aab8ff'}
        />
        <Suspense fallback={null}>
          <Earth theme={theme} />
        </Suspense>
      </Canvas>
    </div>
  );
}
