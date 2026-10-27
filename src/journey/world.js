import * as THREE from 'three';
import { chapters, signs } from './chapters';

// The road runs from z = 0 towards negative z, split into one equal stretch per chapter.
const CHAPTER_COUNT = chapters.length;
const STRETCH = 230;
const ROAD_LENGTH = STRETCH * CHAPTER_COUNT;
const ROAD_HALF_WIDTH = 5;
const LANE_X = -2; // India keeps left
const CAMERA_HEIGHT = 2.3;
const VEHICLE_AHEAD = 6.5;

const stretchStart = (chapter) => -chapter * STRETCH;
const zAt = (chapter, at) => stretchStart(chapter) - at * STRETCH;

// Deterministic random numbers so the world looks the same on every visit.
function createRandom(seed) {
  let state = seed % 2147483647;
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

const smoothstep = (t) => t * t * (3 - 2 * t);
const clamp01 = (v) => Math.min(1, Math.max(0, v));

export function createWorld(canvas, { lowPower }) {
  const density = lowPower ? 0.55 : 1;
  const random = createRandom(20251);
  const between = (min, max) => min + random() * (max - min);
  const disposables = [];
  const track = (thing) => {
    disposables.push(thing);
    return thing;
  };

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !lowPower, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1 : 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000000, 25, 240);
  const camera = new THREE.PerspectiveCamera(62, 1, 0.1, 340);

  // ---------- Sky, stars, sun ----------
  const skyUniforms = { top: { value: new THREE.Color() }, bottom: { value: new THREE.Color() } };
  const sky = new THREE.Mesh(
    track(new THREE.SphereGeometry(215, 32, 16)),
    track(new THREE.ShaderMaterial({
      uniforms: skyUniforms,
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      vertexShader: `
        varying float vHeight;
        void main() {
          vHeight = normalize(position).y;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        uniform vec3 top;
        uniform vec3 bottom;
        varying float vHeight;
        void main() {
          float t = pow(clamp(vHeight * 1.4 + 0.08, 0.0, 1.0), 0.65);
          gl_FragColor = vec4(mix(bottom, top, t), 1.0);
          #include <colorspace_fragment>
        }`,
    })),
  );
  scene.add(sky);

  const starPositions = [];
  for (let i = 0; i < 700; i += 1) {
    const theta = random() * Math.PI * 2;
    const phi = between(0.08, 1.35);
    starPositions.push(
      Math.cos(theta) * Math.cos(phi) * 205,
      Math.sin(phi) * 205,
      Math.sin(theta) * Math.cos(phi) * 205,
    );
  }
  const starGeometry = track(new THREE.BufferGeometry());
  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
  const starMaterial = track(new THREE.PointsMaterial({ color: 0xffffff, size: 1.6, sizeAttenuation: false, transparent: true, fog: false, depthWrite: false }));
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  const sunMaterial = track(new THREE.MeshBasicMaterial({ color: 0xffd9a0, transparent: true, fog: false, depthWrite: false }));
  const sun = new THREE.Mesh(track(new THREE.CircleGeometry(8, 32)), sunMaterial);
  scene.add(sun);

  // ---------- Lights ----------
  const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
  scene.add(hemi);
  const sunLight = new THREE.DirectionalLight(0xffffff, 1);
  scene.add(sunLight);
  scene.add(sunLight.target);

  // ---------- Ground and road ----------
  const groundMaterial = track(new THREE.MeshLambertMaterial({ color: 0x334422 }));
  const ground = new THREE.Mesh(track(new THREE.PlaneGeometry(1400, ROAD_LENGTH + 900)), groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.position.z = -ROAD_LENGTH / 2;
  scene.add(ground);

  const road = new THREE.Mesh(
    track(new THREE.PlaneGeometry(ROAD_HALF_WIDTH * 2, ROAD_LENGTH + 300)),
    track(new THREE.MeshLambertMaterial({ color: 0x2a2a30 })),
  );
  road.rotation.x = -Math.PI / 2;
  road.position.set(0, 0.02, -ROAD_LENGTH / 2 + 100);
  scene.add(road);

  const paintMaterial = track(new THREE.MeshLambertMaterial({ color: 0xe8e2c8, emissive: 0x555044 }));
  const dashCount = Math.floor((ROAD_LENGTH + 200) / 8);
  const dashes = new THREE.InstancedMesh(track(new THREE.BoxGeometry(0.16, 0.02, 2.6)), paintMaterial, dashCount);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < dashCount; i += 1) {
    dummy.position.set(0, 0.04, 50 - i * 8);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    dashes.setMatrixAt(i, dummy.matrix);
  }
  scene.add(dashes);
  [-1, 1].forEach((side) => {
    const edge = new THREE.Mesh(track(new THREE.BoxGeometry(0.14, 0.02, ROAD_LENGTH + 300)), paintMaterial);
    edge.position.set(side * (ROAD_HALF_WIDTH - 0.35), 0.04, -ROAD_LENGTH / 2 + 100);
    scene.add(edge);
  });

  // ---------- Instanced scenery helpers ----------
  function instanced(geometry, material, transforms, colors) {
    if (!transforms.length) return null;
    const mesh = new THREE.InstancedMesh(track(geometry), material, transforms.length);
    transforms.forEach((t, i) => {
      dummy.position.set(t.x, t.y, t.z);
      dummy.rotation.set(t.rx || 0, t.ry || 0, t.rz || 0);
      dummy.scale.set(t.sx ?? 1, t.sy ?? 1, t.sz ?? 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      if (colors) mesh.setColorAt(i, new THREE.Color(colors[i]));
    });
    scene.add(mesh);
    return mesh;
  }

  const white = track(new THREE.MeshLambertMaterial({ color: 0xffffff }));
  const roadsideX = (minGap, spread) => (random() < 0.5 ? -1 : 1) * (ROAD_HALF_WIDTH + minGap + random() * spread);

  // Mountains along the whole road.
  const mountains = [];
  const mountainColors = [];
  for (let z = 80; z > -ROAD_LENGTH - 400; z -= 22 / density) {
    const side = random() < 0.5 ? -1 : 1;
    const h = between(35, 95);
    mountains.push({ x: side * between(140, 320), y: h / 2 - 2, z: z + between(-10, 10), sx: between(50, 110), sy: h, sz: between(40, 90), ry: random() * Math.PI });
    mountainColors.push(random() < 0.5 ? '#3b4256' : '#454a5c');
  }
  instanced(new THREE.ConeGeometry(1, 1, 5), white, mountains, mountainColors);

  // Palms and paddy fields: village and highway stretches.
  const palmTrunks = [];
  const palmLeaves = [];
  const fields = [];
  const fieldColors = [];
  for (let z = 40; z > zAt(2, 1); z -= 9 / density) {
    const x = roadsideX(4, 40);
    const h = between(5, 9);
    const lean = between(-0.12, 0.12);
    palmTrunks.push({ x, y: h / 2, z, sy: h, rz: lean });
    for (let leaf = 0; leaf < 6; leaf += 1) {
      const angle = (leaf / 6) * Math.PI * 2 + random();
      palmLeaves.push({ x: x - Math.sin(lean) * h + Math.cos(angle) * 1.3, y: h - 0.2, z: z + Math.sin(angle) * 1.3, ry: -angle, rz: Math.PI / 2 - 0.5, sx: 0.35, sy: 2.6, sz: 0.9 });
    }
  }
  for (let z = 30; z > zAt(2, 0.7); z -= 16) {
    [-1, 1].forEach((side) => {
      if (random() < 0.25) return;
      fields.push({ x: side * between(16, 60), y: 0.06, z, sx: between(14, 30), sy: 0.1, sz: 13 });
      fieldColors.push(random() < 0.5 ? '#6f9d2b' : '#86b33a');
    });
  }
  instanced(new THREE.CylinderGeometry(0.13, 0.2, 1, 6), track(new THREE.MeshLambertMaterial({ color: 0x7a5a3a })), palmTrunks);
  instanced(new THREE.ConeGeometry(1, 1, 4), track(new THREE.MeshLambertMaterial({ color: 0x2f6b2a })), palmLeaves);
  instanced(new THREE.BoxGeometry(1, 1, 1), white, fields, fieldColors);

  // Round trees along the highway and outskirts.
  const treeTrunks = [];
  const treeCrowns = [];
  const crownColors = [];
  for (let z = zAt(2, 0); z > zAt(4, 0.5); z -= 10 / density) {
    const x = roadsideX(5, 30);
    const s = between(0.8, 1.5);
    treeTrunks.push({ x, y: 1.5 * s, z, sy: 3 * s });
    treeCrowns.push({ x, y: 3.8 * s, z, sx: 2.2 * s, sy: 2 * s, sz: 2.2 * s });
    crownColors.push(random() < 0.5 ? '#3f7a30' : '#4d8a36');
  }
  instanced(new THREE.CylinderGeometry(0.2, 0.25, 1, 6), track(new THREE.MeshLambertMaterial({ color: 0x5d4632 })), treeTrunks);
  instanced(new THREE.IcosahedronGeometry(1, 0), white, treeCrowns, crownColors);

  // Village houses with sloped roofs.
  const houses = [];
  const houseColors = [];
  const roofs = [];
  for (let z = 10; z > zAt(1, 1); z -= 14 / density) {
    if (random() < 0.35) continue;
    const x = roadsideX(6, 22);
    if (x < 0 && Math.abs(z - zAt(1, 0.55)) < 12) continue; // leave room for the gopuram
    const w = between(4, 7);
    const d = between(4, 6);
    houses.push({ x, y: 1.4, z, sx: w, sy: 2.8, sz: d });
    houseColors.push(['#e8d8b8', '#d9b48a', '#c9d6c2', '#e6c7a0'][Math.floor(random() * 4)]);
    roofs.push({ x, y: 3.6, z, sx: w * 0.78, sy: 1.6, sz: d * 0.78, ry: Math.PI / 4 });
  }
  instanced(new THREE.BoxGeometry(1, 1, 1), white, houses, houseColors);
  instanced(new THREE.ConeGeometry(1, 1, 4), track(new THREE.MeshLambertMaterial({ color: 0x9a4a32 })), roofs);

  // A temple gopuram in the village.
  const gopuramMaterial = track(new THREE.MeshLambertMaterial({ color: 0xd8b77a }));
  const gopuramAccent = track(new THREE.MeshLambertMaterial({ color: 0xb4553a }));
  const gopuram = new THREE.Group();
  for (let tier = 0; tier < 7; tier += 1) {
    const w = 11 - tier * 1.25;
    const tierMesh = new THREE.Mesh(track(new THREE.BoxGeometry(w, 2.2, w * 0.6)), tier % 2 ? gopuramAccent : gopuramMaterial);
    tierMesh.position.y = 1.1 + tier * 2.2;
    gopuram.add(tierMesh);
  }
  const kalasam = new THREE.Mesh(track(new THREE.SphereGeometry(0.9, 10, 8)), track(new THREE.MeshLambertMaterial({ color: 0xe0b23c, emissive: 0x332200 })));
  kalasam.position.y = 16.4;
  gopuram.add(kalasam);
  gopuram.position.set(-19, 0, zAt(1, 0.55));
  gopuram.rotation.y = 0.35;
  scene.add(gopuram);

  // ---------- Buildings with lit windows ----------
  const windowMaterials = [];
  const facadeCache = new Map();
  function facadeTextures(variant) {
    if (facadeCache.has(variant)) return facadeCache.get(variant);
    const palette = [['#cfc4b0', '#6b6457'], ['#9fa8b4', '#4b5563'], ['#c7a58a', '#5c4636'], ['#7d8796', '#2f3644']][variant];
    const base = document.createElement('canvas');
    base.width = 64;
    base.height = 64;
    const lit = document.createElement('canvas');
    lit.width = 64;
    lit.height = 64;
    const b = base.getContext('2d');
    const l = lit.getContext('2d');
    b.fillStyle = palette[0];
    b.fillRect(0, 0, 64, 64);
    l.fillStyle = '#000';
    l.fillRect(0, 0, 64, 64);
    for (let row = 0; row < 4; row += 1) {
      for (let col = 0; col < 4; col += 1) {
        const x = 4 + col * 15;
        const y = 5 + row * 15;
        b.fillStyle = palette[1];
        b.fillRect(x, y, 9, 9);
        if (random() < 0.55) {
          l.fillStyle = random() < 0.8 ? '#ffd79a' : '#9fd8ff';
          l.fillRect(x, y, 9, 9);
        }
      }
    }
    const result = [base, lit].map((c) => {
      const tex = track(new THREE.CanvasTexture(c));
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.magFilter = THREE.NearestFilter;
      return tex;
    });
    facadeCache.set(variant, result);
    return result;
  }

  const buildingMaterialCache = new Map();
  function buildingMaterial(variant, repeatX, repeatY) {
    const key = `${variant}-${repeatX}-${repeatY}`;
    if (buildingMaterialCache.has(key)) return buildingMaterialCache.get(key);
    const [baseTex, litTex] = facadeTextures(variant);
    const map = track(baseTex.clone());
    const emissiveMap = track(litTex.clone());
    [map, emissiveMap].forEach((t) => {
      t.repeat.set(repeatX, repeatY);
      t.needsUpdate = true;
    });
    const roof = track(new THREE.MeshLambertMaterial({ color: 0x3a3a40 }));
    const side = track(new THREE.MeshLambertMaterial({ map, emissiveMap, emissive: 0xffffff, emissiveIntensity: 0 }));
    windowMaterials.push(side);
    const materials = [side, side, roof, roof, side, side];
    buildingMaterialCache.set(key, materials);
    return materials;
  }

  const boxGeometry = track(new THREE.BoxGeometry(1, 1, 1));
  const buildingGeometries = new Map();
  function addBuilding(x, z, width, height, depth, variant) {
    const w = Math.max(6, Math.round(width / 3) * 3);
    const h = Math.max(6, Math.round(height / 4) * 4);
    const key = `${w}-${h}-${depth}`;
    if (!buildingGeometries.has(key)) buildingGeometries.set(key, track(new THREE.BoxGeometry(w, h, depth)));
    const mesh = new THREE.Mesh(buildingGeometries.get(key), buildingMaterial(variant, w / 3, h / 4));
    mesh.position.set(x, h / 2, z);
    scene.add(mesh);
    return { w, h };
  }

  // Outskirts (low), city (mid) and neon district (tall).
  const districts = [
    { from: zAt(3, 0.05), to: zAt(3, 1), minH: 6, maxH: 14, gap: 7, chance: 0.6, variants: [0, 2] },
    { from: zAt(4, 0), to: zAt(4, 1), minH: 10, maxH: 26, gap: 6, chance: 0.85, variants: [0, 1, 2] },
    { from: zAt(5, 0), to: zAt(5, 1), minH: 14, maxH: 40, gap: 6, chance: 0.95, variants: [1, 3] },
    { from: zAt(6, 0), to: zAt(6, 1), minH: 24, maxH: 64, gap: 7, chance: 1, variants: [3] },
  ];
  const neonMaterials = [];
  const neonColors = ['#ff4fd8', '#3cf2c2', '#4db5ff', '#ffd23c'];
  const neonMaterialFor = (hex) => {
    const material = track(new THREE.MeshBasicMaterial({ color: hex }));
    neonMaterials.push({ material, base: new THREE.Color(hex) });
    return material;
  };
  const neonPool = neonColors.map(neonMaterialFor);
  districts.forEach((district, index) => {
    [-1, 1].forEach((side) => {
      for (let z = district.from; z > district.to; z -= between(10, 16) / density) {
        if (random() > district.chance) continue;
        const width = between(7, 13);
        const depth = Math.round(between(8, 12));
        const x = side * (ROAD_HALF_WIDTH + district.gap + width / 2 + between(0, 3));
        const variant = district.variants[Math.floor(random() * district.variants.length)];
        const { w, h } = addBuilding(x, z, width, between(district.minH, district.maxH), depth, variant);
        if (index === 3) {
          // Neon edge strips facing the road.
          const strip = neonPool[Math.floor(random() * neonPool.length)];
          const faceX = x - side * (w / 2 + 0.05);
          [-1, 1].forEach((end) => {
            const edge = new THREE.Mesh(boxGeometry, strip);
            edge.scale.set(0.15, h, 0.15);
            edge.position.set(faceX, h / 2, z + end * (depth / 2));
            scene.add(edge);
          });
          const band = new THREE.Mesh(boxGeometry, strip);
          band.scale.set(0.15, 0.25, depth);
          band.position.set(faceX, between(6, h - 2), z);
          scene.add(band);
        }
      }
    });
  });

  // Distant city lights for the epilogue viewpoint.
  const cityLightPositions = [];
  for (let i = 0; i < 900 * density; i += 1) {
    cityLightPositions.push(between(-260, 260), between(-30, 6), zAt(7, 1) - between(60, 280));
  }
  const cityLightGeometry = track(new THREE.BufferGeometry());
  cityLightGeometry.setAttribute('position', new THREE.Float32BufferAttribute(cityLightPositions, 3));
  scene.add(new THREE.Points(cityLightGeometry, track(new THREE.PointsMaterial({ color: 0xffc977, size: 2.2, sizeAttenuation: false, fog: false }))));

  // Guard rail where the road ends.
  const rail = new THREE.Mesh(track(new THREE.BoxGeometry(ROAD_HALF_WIDTH * 2 + 4, 0.5, 0.3)), track(new THREE.MeshLambertMaterial({ color: 0xd0d0d0, emissive: 0x222222 })));
  rail.position.set(0, 0.9, zAt(7, 0.95));
  scene.add(rail);

  // Street lights from the highway onwards.
  const poles = [];
  const lamps = [];
  for (let z = zAt(2, 0.2); z > zAt(7, 0.9); z -= 26 / density) {
    [-1, 1].forEach((side) => {
      const x = side * (ROAD_HALF_WIDTH + 1);
      poles.push({ x, y: 3.5, z, sy: 7 });
      lamps.push({ x: x - side * 0.9, y: 7, z, sx: 1.4, sy: 0.25, sz: 0.5 });
    });
  }
  const lampMaterial = track(new THREE.MeshLambertMaterial({ color: 0x777777, emissive: 0xffd08a, emissiveIntensity: 0 }));
  instanced(new THREE.CylinderGeometry(0.09, 0.12, 1, 6), track(new THREE.MeshLambertMaterial({ color: 0x55585e })), poles);
  instanced(new THREE.BoxGeometry(1, 1, 1), lampMaterial, lamps);

  // Delivery vans parked in the delivery stretch.
  const vanBodies = [];
  const vanCabs = [];
  const vanWheels = [];
  for (let i = 0; i < 7; i += 1) {
    const z = zAt(3, 0.1 + i * 0.12);
    const side = i % 2 ? 1 : -1;
    const x = side * (ROAD_HALF_WIDTH + 2.2);
    vanBodies.push({ x, y: 1.5, z, sx: 2, sy: 2.2, sz: 3.4 });
    vanCabs.push({ x, y: 1.1, z: z - 2.3, sx: 2, sy: 1.5, sz: 1.3 });
    [-1, 1].forEach((wx) => [-1.4, -2.4].forEach((wz) => vanWheels.push({ x: x + wx * 1, y: 0.4, z: z + wz + 1.2, rz: Math.PI / 2, sx: 0.4, sy: 0.3, sz: 0.4 })));
  }
  instanced(new THREE.BoxGeometry(1, 1, 1), track(new THREE.MeshLambertMaterial({ color: 0x84b844 })), vanBodies);
  instanced(new THREE.BoxGeometry(1, 1, 1), track(new THREE.MeshLambertMaterial({ color: 0xf2f2ea })), vanCabs);
  instanced(new THREE.CylinderGeometry(1, 1, 1, 10), track(new THREE.MeshLambertMaterial({ color: 0x1b1b1f })), vanWheels);

  // ---------- Signs ----------
  const signGlowMaterials = [];
  function textCanvas(width, height, draw) {
    const c = document.createElement('canvas');
    c.width = width;
    c.height = height;
    draw(c.getContext('2d'), width, height);
    const tex = track(new THREE.CanvasTexture(c));
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }
  const mono = (size, weight = 700) => `${weight} ${size}px "JetBrains Mono", "Consolas", monospace`;
  const poleMaterial = track(new THREE.MeshLambertMaterial({ color: 0x4a4d55 }));

  signs.forEach((sign) => {
    const group = new THREE.Group();
    const z = zAt(sign.chapter, sign.at);
    if (sign.style === 'milestone') {
      const tex = textCanvas(128, 192, (ctx, w, h) => {
        ctx.fillStyle = '#f4f1e6';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#f0c419';
        ctx.fillRect(0, 0, w, 64);
        ctx.fillStyle = '#1d1d1d';
        ctx.textAlign = 'center';
        ctx.font = mono(20);
        ctx.fillText(sign.lines[0], w / 2, 108);
        ctx.font = mono(46);
        ctx.fillText(sign.lines[1], w / 2, 160);
      });
      const stone = new THREE.Mesh(track(new THREE.BoxGeometry(0.9, 1.35, 0.3)), [
        poleMaterial, poleMaterial, poleMaterial, poleMaterial,
        track(new THREE.MeshLambertMaterial({ map: tex, emissiveMap: tex, emissive: 0xffffff, emissiveIntensity: 0.25 })), poleMaterial,
      ]);
      stone.position.y = 0.68;
      group.add(stone);
      group.position.set(sign.side * (ROAD_HALF_WIDTH + 1.2), 0, z);
      group.rotation.y = -sign.side * 0.5;
    } else if (sign.style === 'neon') {
      const text = sign.lines[0];
      const width = Math.max(10, text.length * 1.15);
      const tex = textCanvas(1024, 192, (ctx, w, h) => {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, w, h);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = mono(Math.min(120, 1500 / text.length));
        ctx.shadowColor = sign.color;
        ctx.shadowBlur = 28;
        ctx.fillStyle = sign.color;
        ctx.fillText(text, w / 2, h / 2);
        ctx.shadowBlur = 6;
        ctx.fillStyle = '#ffffff';
        ctx.fillText(text, w / 2, h / 2);
      });
      // Neon banners hang across the road on a gantry, so they are always in view.
      const span = ROAD_HALF_WIDTH * 2 + 2;
      const bannerWidth = Math.min(span - 1, width);
      const bannerHeight = bannerWidth * 0.19;
      const backing = new THREE.Mesh(track(new THREE.BoxGeometry(bannerWidth + 0.5, bannerHeight + 0.4, 0.25)), track(new THREE.MeshLambertMaterial({ color: 0x0b0b12 })));
      const glowMaterial = track(new THREE.MeshBasicMaterial({ map: tex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }));
      signGlowMaterials.push(glowMaterial);
      const face = new THREE.Mesh(track(new THREE.PlaneGeometry(bannerWidth, bannerHeight)), glowMaterial);
      face.position.z = 0.14;
      const beam = new THREE.Mesh(track(new THREE.BoxGeometry(span, 0.25, 0.25)), poleMaterial);
      beam.position.y = bannerHeight / 2 + 0.4;
      group.add(backing, face, beam);
      [-1, 1].forEach((end) => {
        const pole = new THREE.Mesh(track(new THREE.CylinderGeometry(0.15, 0.15, 9, 6)), poleMaterial);
        pole.position.set(end * span / 2, -4.1, 0);
        group.add(pole);
      });
      group.position.set(0, 8.6, z);
    } else {
      const highway = sign.style === 'highway';
      const tex = textCanvas(1024, 512, (ctx, w, h) => {
        ctx.fillStyle = highway ? '#126b3a' : '#f3ead6';
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = highway ? '#ffffff' : '#1f5fbf';
        ctx.lineWidth = 14;
        ctx.strokeRect(18, 18, w - 36, h - 36);
        ctx.fillStyle = highway ? '#ffffff' : '#1b1f2a';
        ctx.textAlign = 'center';
        ctx.font = mono(sign.lines[0].length > 16 ? 70 : 96);
        ctx.fillText(sign.lines[0], w / 2, h / 2 - 6);
        ctx.font = mono(52, 500);
        ctx.fillStyle = highway ? '#e8f5ec' : '#1f5fbf';
        ctx.fillText(sign.lines[1], w / 2, h / 2 + 90);
      });
      const boardMaterial = track(new THREE.MeshLambertMaterial({ map: tex, emissiveMap: tex, emissive: 0xffffff, emissiveIntensity: 0.3 }));
      signGlowMaterials.push(boardMaterial);
      const board = new THREE.Mesh(track(new THREE.PlaneGeometry(9, 4.5)), boardMaterial);
      group.add(board);
      [-1, 1].forEach((end) => {
        const pole = new THREE.Mesh(track(new THREE.CylinderGeometry(0.14, 0.14, 6, 6)), poleMaterial);
        pole.position.set(end * 3, -3.5, -0.1);
        group.add(pole);
      });
      group.position.set(sign.side * (ROAD_HALF_WIDTH + 6), 6.2, z);
      group.rotation.y = -sign.side * 0.3;
    }
    scene.add(group);
  });

  // ---------- Vehicles ----------
  const vehicleMetal = track(new THREE.MeshLambertMaterial({ color: 0x1d2128 }));
  const tyre = track(new THREE.MeshLambertMaterial({ color: 0x0d0d0f }));
  const headlampMaterial = track(new THREE.MeshBasicMaterial({ color: 0xfff3d6 }));
  const tailMaterial = track(new THREE.MeshBasicMaterial({ color: 0xff3b30 }));
  const wheels = [];

  function wheel(radius, tube, z) {
    const mesh = new THREE.Mesh(track(new THREE.TorusGeometry(radius, tube, 8, 20)), tyre);
    mesh.rotation.y = Math.PI / 2;
    mesh.position.set(0, radius + tube, z);
    wheels.push({ mesh, radius: radius + tube });
    return mesh;
  }
  function bar(length, radius, material, position, rotation) {
    const mesh = new THREE.Mesh(track(new THREE.CylinderGeometry(radius, radius, length, 6)), material);
    mesh.position.set(...position);
    mesh.rotation.set(...rotation);
    return mesh;
  }
  function lamp(material, size, position) {
    const mesh = new THREE.Mesh(track(new THREE.SphereGeometry(size, 10, 8)), material);
    mesh.position.set(...position);
    return mesh;
  }

  const bicycle = new THREE.Group();
  const frameMaterial = track(new THREE.MeshLambertMaterial({ color: 0x2e5e3b }));
  bicycle.add(
    wheel(0.34, 0.035, -0.55),
    wheel(0.34, 0.035, 0.55),
    bar(1.0, 0.035, frameMaterial, [0, 0.62, 0], [Math.PI / 2 - 0.25, 0, 0]),
    bar(0.65, 0.035, frameMaterial, [0, 0.55, 0.32], [0.4, 0, 0]),
    bar(0.6, 0.035, frameMaterial, [0, 0.62, -0.45], [-0.35, 0, 0]),
    bar(0.6, 0.03, vehicleMetal, [0, 0.95, -0.55], [0, 0, Math.PI / 2]),
    bar(0.25, 0.06, vehicleMetal, [0, 0.95, 0.22], [Math.PI / 2, 0, 0]),
    lamp(headlampMaterial, 0.06, [0, 0.85, -0.66]),
    lamp(tailMaterial, 0.05, [0, 0.75, 0.68]),
  );

  function scooter(withCrate, big) {
    const group = new THREE.Group();
    const body = track(new THREE.MeshLambertMaterial({ color: big ? 0x8a1f2b : 0xc23b2b }));
    const r = big ? 0.32 : 0.26;
    group.add(wheel(r, 0.09, -0.62), wheel(r, 0.09, 0.62));
    const floor = new THREE.Mesh(track(new THREE.BoxGeometry(0.42, 0.18, 0.9)), body);
    floor.position.set(0, 0.45, 0.05);
    const seat = new THREE.Mesh(track(new THREE.BoxGeometry(0.4, 0.14, 0.62)), vehicleMetal);
    seat.position.set(0, big ? 0.95 : 0.85, 0.3);
    const front = new THREE.Mesh(track(new THREE.BoxGeometry(0.46, big ? 0.5 : 0.75, 0.25)), body);
    front.position.set(0, big ? 0.85 : 0.75, -0.48);
    front.rotation.x = 0.25;
    const rear = new THREE.Mesh(track(new THREE.BoxGeometry(0.44, 0.38, 0.6)), body);
    rear.position.set(0, 0.7, 0.42);
    group.add(floor, seat, front, rear);
    group.add(bar(0.75, 0.035, vehicleMetal, [0, 1.15, -0.55], [0, 0, Math.PI / 2]));
    group.add(lamp(headlampMaterial, 0.08, [0, 1.05, -0.66]), lamp(tailMaterial, 0.06, [0, 0.85, 0.74]));
    if (big) {
      const tank = new THREE.Mesh(track(new THREE.BoxGeometry(0.45, 0.28, 0.5)), body);
      tank.position.set(0, 0.95, -0.15);
      group.add(tank, bar(0.5, 0.06, vehicleMetal, [0.22, 0.45, 0.45], [Math.PI / 2, 0, 0]));
    }
    if (withCrate) {
      const crate = new THREE.Mesh(track(new THREE.BoxGeometry(0.62, 0.55, 0.55)), track(new THREE.MeshLambertMaterial({ color: 0x84b844 })));
      crate.position.set(0, 1.18, 0.62);
      group.add(crate);
    }
    return group;
  }
  const vehicles = {
    bicycle,
    'scooter-crate': scooter(true, false),
    scooter: scooter(false, false),
    motorbike: scooter(false, true),
  };
  const vehicleRoot = new THREE.Group();
  Object.values(vehicles).forEach((v) => vehicleRoot.add(v));
  scene.add(vehicleRoot);

  const headlight = new THREE.SpotLight(0xfff1d0, 0, 45, 0.5, 0.6, 1.2);
  vehicleRoot.add(headlight);
  headlight.position.set(0, 1.1, -0.7);
  headlight.target.position.set(0, 0, -20);
  vehicleRoot.add(headlight.target);

  // ---------- Time of day ----------
  const keys = chapters.map(({ sky: s }) => ({
    top: new THREE.Color(s.top),
    bottom: new THREE.Color(s.bottom),
    fog: new THREE.Color(s.fog),
    ground: new THREE.Color(s.ground),
    light: s.light,
    sun: s.sun,
    windows: s.windows,
    neon: s.neon,
    stars: s.stars,
  }));
  const mixed = { top: new THREE.Color(), bottom: new THREE.Color(), fog: new THREE.Color(), ground: new THREE.Color() };
  const tmpColor = new THREE.Color();

  function applyTimeOfDay(progress) {
    const f = Math.min(CHAPTER_COUNT - 1, Math.max(0, progress * CHAPTER_COUNT - 0.5));
    const i = Math.min(CHAPTER_COUNT - 2, Math.floor(f));
    const t = smoothstep(clamp01(f - i));
    const a = keys[i];
    const b = keys[i + 1];
    ['top', 'bottom', 'fog', 'ground'].forEach((k) => mixed[k].copy(a[k]).lerp(b[k], t));
    const lerp = (k) => a[k] + (b[k] - a[k]) * t;
    const light = lerp('light');
    const sunLevel = lerp('sun');
    const windows = lerp('windows');
    const neon = lerp('neon');
    const darkness = clamp01((0.85 - light) / 0.55);

    skyUniforms.top.value.copy(mixed.top);
    skyUniforms.bottom.value.copy(mixed.bottom);
    scene.fog.color.copy(mixed.fog);
    renderer.setClearColor(mixed.fog);
    groundMaterial.color.copy(mixed.ground);
    hemi.color.copy(mixed.top).lerp(tmpColor.set(0xffffff), 0.5);
    hemi.groundColor.copy(mixed.ground);
    hemi.intensity = 0.6 + light * 1.6;
    sunLight.color.copy(mixed.bottom).lerp(tmpColor.set(0xffffff), 0.4);
    sunLight.intensity = sunLevel * 2.2;
    starMaterial.opacity = lerp('stars');
    sunMaterial.opacity = clamp01(sunLevel);
    sunMaterial.color.copy(mixed.bottom).lerp(tmpColor.set(0xfff4d6), 0.6);
    windowMaterials.forEach((m) => {
      m.emissiveIntensity = windows * 1.4;
    });
    neonMaterials.forEach(({ material, base }) => material.color.copy(base).multiplyScalar(0.15 + neon * 0.85));
    signGlowMaterials.forEach((m) => {
      if (m.isMeshBasicMaterial) m.opacity = 0.25 + neon * 0.75 + darkness * 0.2;
      else m.emissiveIntensity = 0.25 + darkness * 0.55;
    });
    lampMaterial.emissiveIntensity = darkness * 2.5;
    headlight.intensity = darkness * 60;
    return { chapterIndex: Math.min(CHAPTER_COUNT - 1, Math.floor(progress * CHAPTER_COUNT)) };
  }

  // ---------- Frame update ----------
  let lastZ = 0;
  let time = 0;
  function update(progress, dt) {
    time += dt;
    const camZ = 8 - progress * (ROAD_LENGTH - 30);
    const travelled = lastZ - camZ;
    lastZ = camZ;

    const { chapterIndex } = applyTimeOfDay(progress);
    const vehicleKey = chapters[chapterIndex].vehicle;
    Object.entries(vehicles).forEach(([key, group]) => {
      group.visible = key === vehicleKey;
    });
    wheels.forEach(({ mesh, radius }) => {
      mesh.rotation.x -= travelled / radius;
    });

    const speed = Math.min(1, Math.abs(travelled) / Math.max(dt, 0.001) / 60);
    const sway = Math.sin(time * 0.6) * 0.15;
    vehicleRoot.position.set(LANE_X + sway * 0.4, Math.sin(time * 9) * 0.015 * speed, camZ - VEHICLE_AHEAD);
    vehicleRoot.rotation.z = -sway * 0.12;

    camera.position.set(LANE_X + sway * 0.3, CAMERA_HEIGHT + Math.sin(time * 1.3) * 0.04, camZ);
    camera.lookAt(LANE_X * 0.6, 1.3, camZ - 40);

    sky.position.copy(camera.position);
    stars.position.copy(camera.position);
    sun.position.set(camera.position.x + 38, 24, camZ - 195);
    sun.lookAt(camera.position);
    sunLight.position.set(camera.position.x + 60, 80, camZ - 40);
    sunLight.target.position.set(camera.position.x, 0, camZ - 60);

    renderer.render(scene, camera);
    return { chapterIndex, speed, vehicle: vehicleKey };
  }

  let viewport = { width: 1, height: 1 };
  function resize(width, height) {
    viewport = { width, height };
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.fov = width < 700 ? 72 : 62;
    camera.updateProjectionMatrix();
  }

  // 'high' renders sharper and further; 'low' trades detail for frame rate.
  function setQuality(level) {
    const high = level === 'high';
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, high ? 1.5 : 0.75));
    camera.far = high ? 340 : 230;
    scene.fog.far = high ? 240 : 200;
    resize(viewport.width, viewport.height);
  }

  function dispose() {
    disposables.forEach((d) => d.dispose && d.dispose());
    renderer.dispose();
  }

  return { update, resize, setQuality, dispose };
}
