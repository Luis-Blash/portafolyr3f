import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const useCameraFly = (
  cameraRef,
  controlsRef,
) => {

  const animRef = useRef(null);
  const originalConstraints = useRef({});

  const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

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
      animRef.current.active = false;

      if (anim.restoreRotateOnFinish) {
        const orig = originalConstraints.current;
        if (orig.minPolarAngle !== undefined) ctrls.minPolarAngle = orig.minPolarAngle;
        if (orig.maxPolarAngle !== undefined) ctrls.maxPolarAngle = orig.maxPolarAngle;
        if (orig.minAzimuthAngle !== undefined) ctrls.minAzimuthAngle = orig.minAzimuthAngle;
        if (orig.maxAzimuthAngle !== undefined) ctrls.maxAzimuthAngle = orig.maxAzimuthAngle;
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
  const moveTo = ({ data, durationSeconds = 1.2, restoreRotateOnFinish = false, onFinishAnimation }) => {
    const cam = cameraRef.current;
    const ctrls = controlsRef.current;
    if (!cam || !ctrls) return;

    // guardar constraints la primera vez
    if (originalConstraints.current.enableRotate === undefined) {
      originalConstraints.current = {
        minPolarAngle: ctrls.minPolarAngle ?? 1,
        maxPolarAngle: ctrls.maxPolarAngle ?? 1.2,
        minAzimuthAngle: ctrls.minAzimuthAngle ?? 0.7,
        maxAzimuthAngle: ctrls.maxAzimuthAngle ?? 1.1,
        enableRotate: ctrls.enableRotate
      };
    }

    // abrir límites para evitar bloqueos durante la animación
    ctrls.minPolarAngle = 0;
    ctrls.maxPolarAngle = Math.PI;
    ctrls.minAzimuthAngle = -Infinity;
    ctrls.maxAzimuthAngle = Infinity;

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
