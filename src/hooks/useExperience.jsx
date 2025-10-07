import { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls as ThreeOrbitControls } from 'three-stdlib'
import { useStore } from '@nanostores/react';
// interface
import type { ClickMeshProps } from '../interface/RoomInterface';
// hooks
import useCameraFly from '../hooks/useCameraFly';
// constants
import { positionCameraConstants, positionCameraConstantsMobile } from '../constants/positionCamera';
import { buttonHeaderState, showButtonHeaderState } from '../store';
import useResponsive from './useResponsive';

type PositionSceneProps = {
    type: 'default' | 'scene',
    current: string,
}
const useExperience = () => {

    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const controlsRef = useRef<ThreeOrbitControls | null>(null);
    
    
    const [activeCamera, setActiveCamera] = useState<boolean>(false);
    const [positionSceneCurrent, setpositionSceneCurrent] = useState<PositionSceneProps>({ type: 'default', current: 'default' });
    const isActiveHtml = useMemo(() => positionSceneCurrent.type === 'scene', [positionSceneCurrent]);
    
    const $buttonHeaderState = useStore(buttonHeaderState)
    
    const { moveTo } = useCameraFly(cameraRef, controlsRef);
    const { isMobile } = useResponsive();


    const actionHandlerClick = ({ name }: ClickMeshProps) => {
        if (name === 'pantallaContact') {
            import('astro:transitions/client').then(({ navigate }) => {
                navigate('/contact');
            });
            return
        }
        const cfg = isMobile ? positionCameraConstantsMobile[name] : positionCameraConstants[name];
        if (!cfg) return;
        if (positionSceneCurrent.type === 'scene') return;

        moveTo({
            data: cfg,
            durationSeconds: 1.2,
            restoreRotateOnFinish: false,
            onFinishAnimation: () => {
                setpositionSceneCurrent({ type: 'scene', current: name });
                showButtonHeaderState.set(true)
            }
        });
    }

    const handleScreenClick = (e: any, { name }: ClickMeshProps) => {
        e.stopPropagation();
        actionHandlerClick({ name });
    }

    const moveBackDefault = () => {
        setpositionSceneCurrent({ type: 'default', current: 'default' });
        moveTo({
            data: positionCameraConstants.default,
            durationSeconds: 1.2,
            restoreRotateOnFinish: true,
        });
    }

    useEffect(() => {
        if ($buttonHeaderState.clicked) {
            const infoButtonHeader = $buttonHeaderState.data || ''
            if (infoButtonHeader === 'back') {
                moveBackDefault()
                return
            }
            actionHandlerClick({ name: infoButtonHeader })
        }
    }, [$buttonHeaderState])

    return {
        isMobile,
        cameraRef,
        controlsRef,
        positionSceneCurrent,
        isActiveHtml,
        handleScreenClick,
        activeCamera,
        setActiveCamera,
    }
}

export default useExperience