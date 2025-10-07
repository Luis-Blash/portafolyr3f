import { useRef, useState, useMemo } from 'react';
// constants
import { positionCameraConstants, positionCameraConstantsMobile } from '../constants/positionCamera';
// hooks
import useCameraFly from './useCameraFly';
import useResponsive from './useResponsive';

const useExperience = () => {

    const cameraRef = useRef(null);
    const controlsRef = useRef(null);


    const [activeCamera, setActiveCamera] = useState(false);
    const [positionSceneCurrent, setpositionSceneCurrent] = useState({ type: 'default', current: 'default' });
    const isActiveHtml = useMemo(() => positionSceneCurrent.type === 'scene', [positionSceneCurrent]);

    const { moveTo } = useCameraFly(cameraRef, controlsRef);
    const { isMobile } = useResponsive();


    const actionHandlerClick = ({ name }) => {
        console.log(name);
        const cfg = isMobile ? positionCameraConstantsMobile[name] : positionCameraConstants[name];
        if (!cfg) return;
        if (positionSceneCurrent.type === 'scene') return;

        moveTo({
            data: cfg,
            durationSeconds: 1.2,
            restoreRotateOnFinish: false,
            onFinishAnimation: () => {
                setpositionSceneCurrent({ type: 'scene', current: name });
            }
        });
    }

    const handleScreenClick = (e, { name }) => {
        e.stopPropagation();
        actionHandlerClick({ name });
    }

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