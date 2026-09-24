import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function NeuralScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
    camera.position.z = 8;
    const group = new THREE.Group();
    scene.add(group);

    const coreGeometry = new THREE.IcosahedronGeometry(1.13, 2);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x6850c9,
      metalness: 0.5,
      roughness: 0.3,
      flatShading: true,
      clearcoat: 0.8,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);
    const wire = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.65, 1)),
      new THREE.LineBasicMaterial({
        color: 0xa78bfa,
        transparent: true,
        opacity: 0.22,
      }),
    );
    group.add(wire);
    const ringGeometry = new THREE.TorusGeometry(2.05, 0.009, 5, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x9b8be9,
      transparent: true,
      opacity: 0.55,
    });
    const rings = [0, 1, 2].map((i) => {
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.set(Math.PI / 2 + i * 0.63, i * 0.88, i * 0.3);
      ring.scale.setScalar(1 + i * 0.12);
      group.add(ring);
      return ring;
    });
    const positions: number[] = [];
    const connections: number[] = [];
    for (let i = 0; i < 65; i++) {
      const y = 1 - (i / 64) * 2;
      const r = Math.sqrt(1 - y * y);
      const angle = i * 2.399963;
      positions.push(
        Math.cos(angle) * r * 1.65,
        y * 1.65,
        Math.sin(angle) * r * 1.65,
      );
    }
    for (let i = 0; i < 65; i++)
      for (let j = i + 1; j < 65; j++) {
        const a = new THREE.Vector3().fromArray(positions, i * 3);
        const b = new THREE.Vector3().fromArray(positions, j * 3);
        if (a.distanceTo(b) < 0.77)
          connections.push(...a.toArray(), ...b.toArray());
      }
    const nodes = new THREE.Points(
      new THREE.BufferGeometry().setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3),
      ),
      new THREE.PointsMaterial({
        color: 0x76e1ec,
        size: 0.042,
        sizeAttenuation: true,
      }),
    );
    group.add(nodes);
    group.add(
      new THREE.LineSegments(
        new THREE.BufferGeometry().setAttribute(
          "position",
          new THREE.Float32BufferAttribute(connections, 3),
        ),
        new THREE.LineBasicMaterial({
          color: 0x6b92dd,
          transparent: true,
          opacity: 0.16,
        }),
      ),
    );
    const satellite = new THREE.Mesh(
      new THREE.SphereGeometry(0.055, 12, 8),
      new THREE.MeshBasicMaterial({ color: 0x8dedff }),
    );
    group.add(satellite);
    scene.add(new THREE.AmbientLight(0xb0a2e8, 2.5));
    const key = new THREE.DirectionalLight(0xc6aaff, 6);
    key.position.set(-3, 3, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x22d3ee, 5);
    rim.position.set(4, -1, 2);
    scene.add(rim);
    const back = new THREE.DirectionalLight(0x4c26b9, 3);
    back.position.set(0, 0, -3);
    scene.add(back);

    let pointerX = 0,
      pointerY = 0,
      visible = true,
      lost = false;
    let last = 0,
      time = 0,
      frame = 0;
    const move = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.3;
      pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.25;
    };
    const leave = () => {
      pointerX = 0;
      pointerY = 0;
    };
    const draw = (now: number) => {
      if (lost || !visible || document.hidden) {
        frame = 0;
        return;
      }
      time += Math.min((now - last) / 1000, 0.05);
      last = now;
      group.rotation.y +=
        (time * 0.065 + pointerX + window.scrollY * 0.0003 - group.rotation.y) *
        0.04;
      group.rotation.x += (pointerY - group.rotation.x) * 0.04;
      core.rotation.y = -time * 0.12;
      core.rotation.z = Math.sin(time * 0.25) * 0.08;
      rings[1].rotation.z = time * 0.08;
      satellite.position.set(
        Math.cos(time * 0.3) * 2.05,
        Math.sin(time * 0.3) * 0.6,
        Math.sin(time * 0.3) * 1.94,
      );
      renderer.render(scene, camera);
      frame = requestAnimationFrame(draw);
    };
    const resume = () => {
      if (!frame && visible && !document.hidden && !lost)
        frame = requestAnimationFrame(draw);
    };
    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const contextLost = (event: Event) => {
      event.preventDefault();
      lost = true;
      host.parentElement?.classList.remove("scene-ready");
    };
    const contextRestored = () => {
      lost = false;
      host.parentElement?.classList.add("scene-ready");
      resume();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      resume();
    });
    visibilityObserver.observe(host);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    renderer.domElement.addEventListener("webglcontextlost", contextLost);
    renderer.domElement.addEventListener(
      "webglcontextrestored",
      contextRestored,
    );
    document.addEventListener("visibilitychange", resume);
    resize();
    renderer.render(scene, camera);
    host.parentElement?.classList.add("scene-ready");
    resume();
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", resume);
      renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      renderer.domElement.removeEventListener(
        "webglcontextrestored",
        contextRestored,
      );
      host.parentElement?.classList.remove("scene-ready");
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse((object) => {
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.LineSegments ||
          object instanceof THREE.Points
        ) {
          geometries.add(object.geometry);
          (Array.isArray(object.material)
            ? object.material
            : [object.material]
          ).forEach((material) => materials.add(material));
        }
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);
  return <div ref={hostRef} className="three-scene" />;
}
