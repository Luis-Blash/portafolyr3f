// src/hooks/useCameraFly.ts
import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import type { PerspectiveCamera } from 'three';
import type { OrbitControls as ThreeOrbitControls } from 'three-stdlib';

interface PositionCamera {
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
}

interface MoveToParams {
  data: PositionCamera;
  durationSeconds?: number;
  restoreRotateOnFinish?: boolean;
  onFinishAnimation?: () => void;
}

type AnimRef = {
  active: boolean;
  startPos: THREE.Vector3;
  endPos: THREE.Vector3;
  startTarget: THREE.Vector3;
  endTarget: THREE.Vector3;
  startTime: number;
  duration: number; // segundos
  restoreRotateOnFinish?: boolean;
  onFinishAnimation?: () => void;
} | null;

type OriginalConstraints = {
  minPolarAngle?: number;
  maxPolarAngle?: number;
  minAzimuthAngle?: number;
  maxAzimuthAngle?: number;
  enableRotate?: boolean;
}

const useCameraFly = (
  cameraRef: React.RefObject<PerspectiveCamera | null>,
  controlsRef: React.RefObject<ThreeOrbitControls | null>,
) => {

  const animRef = useRef<AnimRef>(null);
  const originalConstraints = useRef<OriginalConstraints>({});

  const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  useFrame(() => {
    const anim = animRef.current;
    const cam = cameraRef.current;
    const ctrls = controlsRef.current;
    if (!anim || !anim.active || !cam || !ctrls) return;

    const now = performance.now();
    const tRaw = (now - anim.startTime) / (anim.duration * 1000);
    const tClamped = Math.min(1, Math.max(0, tRaw));
    const t = easeInOutQuad(tClamped);

    cam.position.lerpVectors(anim.startPos, anim.endPos, t);

    const newTarget = new THREE.Vector3().lerpVectors(anim.startTarget, anim.endTarget, t);
    ctrls.target.copy(newTarget);
    cam.lookAt(newTarget);

    if (tClamped >= 1) {
      animRef.current!.active = false;

      if (anim.restoreRotateOnFinish) {
        const orig = originalConstraints.current;
        if (orig.minPolarAngle !== undefined) (ctrls as any).minPolarAngle = orig.minPolarAngle;
        if (orig.maxPolarAngle !== undefined) (ctrls as any).maxPolarAngle = orig.maxPolarAngle;
        if (orig.minAzimuthAngle !== undefined) (ctrls as any).minAzimuthAngle = orig.minAzimuthAngle;
        if (orig.maxAzimuthAngle !== undefined) (ctrls as any).maxAzimuthAngle = orig.maxAzimuthAngle;
        ctrls.enableRotate = orig.enableRotate ?? true;
      } else {
        ctrls.enableRotate = false;
      }

      ctrls.update();
      // Ejecutar callback (si existe)
      try {
        anim.onFinishAnimation?.();
      } catch (e) {
        console.error('onFinishAnimation callback threw an error:', e);
      }
    }
  });

  // función que inicia la animación
  const moveTo = ({ data, durationSeconds = 1.2, restoreRotateOnFinish = false, onFinishAnimation }: MoveToParams) => {
    const cam = cameraRef.current;
    const ctrls = controlsRef.current;
    if (!cam || !ctrls) return;

    // guardar constraints la primera vez
    if (originalConstraints.current.enableRotate === undefined) {
      originalConstraints.current = {
        minPolarAngle: (ctrls as any).minPolarAngle ?? 1,
        maxPolarAngle: (ctrls as any).maxPolarAngle ?? 1.2,
        minAzimuthAngle: (ctrls as any).minAzimuthAngle ?? 0.7,
        maxAzimuthAngle: (ctrls as any).maxAzimuthAngle ?? 1.1,
        enableRotate: ctrls.enableRotate
      };
    }

    // abrir límites para evitar bloqueos durante la animación
    (ctrls as any).minPolarAngle = 0;
    (ctrls as any).maxPolarAngle = Math.PI;
    (ctrls as any).minAzimuthAngle = -Infinity;
    (ctrls as any).maxAzimuthAngle = Infinity;

    // desactivar rotación mientras se mueve
    ctrls.enableRotate = false;

    const startPos = cam.position.clone();
    const endPos = new THREE.Vector3(...data.cameraPosition);
    const startTarget = ctrls.target.clone();
    const endTarget = new THREE.Vector3(...data.cameraTarget);

    // sobreescribir/cancelar anim previa
    animRef.current = {
      active: true,
      startPos,
      endPos,
      startTarget,
      endTarget,
      startTime: performance.now(),
      duration: durationSeconds,
      restoreRotateOnFinish,
      onFinishAnimation
    };
  };

  const isAnimating = () => !!(animRef.current && animRef.current.active);

  return { moveTo, isAnimating };
}

export default useCameraFly;
