import { Html } from "@react-three/drei";
import { useEffect, useState } from "react";

const FadeHtml = ({ className = '', children, ...rest }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const t = window.setTimeout(() => setVisible(true), 16);
        return () => window.clearTimeout(t);
    }, []);

    return (
        <Html
            {...rest}
            pointerEvents={visible ? 'auto' : 'none'}
            className={`${className} transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
            {children}
        </Html>
    );
}

export default FadeHtml