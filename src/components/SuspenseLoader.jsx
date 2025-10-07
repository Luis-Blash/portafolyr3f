import { useEffect, useRef } from 'react';
import { Html, useProgress } from '@react-three/drei';

const SuspenseLoader = ({ onLoaded }) => {
    const { active, loaded, total } = useProgress();
    const calledRef = useRef(false);

    useEffect(() => {
        if (calledRef.current) return;

        const finished = (!active && total > 0) || (total > 0 && loaded === total);
        if (finished) {
            calledRef.current = true;
            onLoaded?.();
            window.dispatchEvent(new Event("finishLoader"));
        }
    }, [active, loaded, total, onLoaded]);

    return (
        <Html fullscreen transform={false} className="bg-red-400 w-full h-full flex items-center justify-center">
        </Html>
    );
}

export default SuspenseLoader