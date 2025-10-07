import { useRef, useState, useMemo, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
// constants
import { positionCameraConstants, positionCameraConstantsMobile } from '../constants/positionCamera';
// hooks
import useCameraFly from './useCameraFly';
import useResponsive from './useResponsive';

const useExperience = () => {

    const {
        moveDefault,
        setActiveBack,
        setMoveDefault,
        positionName,
        setPositionName
    } = useNavigation();

    const cameraRef = useRef(null);
    const controlsRef = useRef(null);


    const [activeCamera, setActiveCamera] = useState(false);
    const [positionSceneCurrent, setpositionSceneCurrent] = useState({ type: 'default', current: 'default' });
    const isActiveHtml = useMemo(() => positionSceneCurrent.type === 'scene', [positionSceneCurrent]);

    const { moveTo } = useCameraFly(cameraRef, controlsRef);
    const { isMobile } = useResponsive();


    const actionHandlerClick = ({ name }) => {
        const cfg = isMobile ? positionCameraConstantsMobile[name] : positionCameraConstants[name];
        if (!cfg) return;
        if (positionSceneCurrent.type === 'scene') return;

        moveTo({
            data: cfg,
            durationSeconds: 1.2,
            restoreRotateOnFinish: false,
            onFinishAnimation: () => {
                setpositionSceneCurrent({ type: 'scene', current: name });
                setActiveBack(true);
            }
        });
    }

    const handleScreenClick = (e, { name }) => {
        e.stopPropagation();
        actionHandlerClick({ name });
    }

    const moveBackDefault = () => {
        setActiveBack(false);
        setMoveDefault(false);
        setPositionName('default');
        setpositionSceneCurrent({ type: 'default', current: 'default' });
        moveTo({
            data: positionCameraConstants.default,
            durationSeconds: 1.2,
            restoreRotateOnFinish: true,
        });
    }

    useEffect(() => {
        if (!moveDefault) return;
        moveBackDefault()
    }, [moveDefault]);

    useEffect(() => {
        if (positionName === 'default') return;
        actionHandlerClick({ name: positionName });
    }, [positionName]);

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