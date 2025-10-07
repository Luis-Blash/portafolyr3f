import { useEffect, useRef } from "react";
import gsap from "gsap";

const Loader = () => {

    const loaderContainerRef = useRef(null);
    const loaderSvgRef = useRef(null);
    const BIDRef = useRef(null); // layer3
    const CIDRef = useRef(null); // layer4
    const NIDRef = useRef(null); // g2
    const NID2Ref = useRef(null); // g1

    useEffect(() => {
        const loaderContainer = loaderContainerRef.current;
        const loaderSvg = loaderSvgRef.current;
        const BID = BIDRef.current;
        const CID = CIDRef.current;
        const NID = NIDRef.current;
        const NID2 = NID2Ref.current;

        if (!BID || !CID || !NID || !NID2) return;

        const tl = gsap.timeline();
        tl.from(BID, { duration: 2, y: 300, ease: "power2.out" }, 0)
            .from(CID, { duration: 2, y: -300, ease: "power2.out" }, 0)
            .from(NID, { duration: 2, y: 300, ease: "power2.out" }, 0)
            .from(NID2, { duration: 1.5, opacity: 0, ease: "power2.out" }, 1.2);

        // Promise que se resuelve cuando tl termina
        const tlDone = new Promise((resolve) => {
            tl.eventCallback("onComplete", resolve);
        });

        // Promise que se resuelve una sola vez al recibir el evento finishLoader
        let finishHandler = null;
        const finishLoaderEvent = new Promise((resolve) => {
            finishHandler = () => {
                window.removeEventListener("finishLoader", finishHandler);
                resolve();
            };
            window.addEventListener("finishLoader", finishHandler);
        });

        // Esperar a ambas y luego ejecutar tl2
        Promise.all([tlDone, finishLoaderEvent]).then(() => {
            const tl2 = gsap.timeline();
            tl2
                .to(loaderSvg, {
                    duration: 1,
                    width: 0,
                    height: 0,
                    opacity: 0,
                    ease: "power2.out",
                })
                .to(
                    loaderContainer,
                    { duration: 1, opacity: 0, display: "none", ease: "power2.out" },
                    ">0"
                );
        });

        return () => {
            // limpieza
            if (finishHandler) window.removeEventListener("finishLoader", finishHandler);
            tl.kill();
            gsap.killTweensOf([loaderSvg, BID, CID, NID, NID2, loaderContainer]);
        };
    }, []);

    return (
        <div
            ref={loaderContainerRef}
            id="loaderContainer"
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        >
            <div
                ref={loaderSvgRef}
                id="loaderSvg"
                className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] bg-white rounded-full p-8"
            >
                <svg
                    viewBox="0 0 363 265"
                    version="1.1"
                    id="svg1"
                    xmlSpace="preserve"
                    className="w-full h-full"
                >
                    <defs id="defs1"> </defs>
                    {/* B */}
                    <g
                        id="layer3"
                        ref={BIDRef}
                        style={{ display: "inline", fill: "#000000" }}
                        transform="matrix(2.1216016,0,0,2.1216016,-42.26434,-147.86092)"
                    >
                        <path
                            id="path18"
                            style={{
                                display: "inline",
                                mixBlendMode: "normal",
                                fill: "none",
                                fillOpacity: 1,
                                fillRule: "evenodd",
                                stroke: "#000000",
                                strokeWidth: 0.621726,
                                strokeDasharray: "none",
                                strokeOpacity: 1,
                            }}
                            d="m 27.877915,113.05757 13.665642,18.58527 36.25951,-0.54662 c 0,0 5.284049,1.09325 5.648465,6.55951 0.364419,5.46626 -4.008588,6.3773 -4.008588,6.3773 H 59.582208 v -7.83497 h -20.58957 v 56.84908 h 48.831901 c 0,0 16.034351,-6.19509 17.492021,-20.04295 1.45767,-13.84785 -10.932513,-21.13619 -10.932513,-21.13619 0,0 10.750313,-8.01718 8.563803,-18.9497 -2.1865,-10.93251 -5.830673,-16.58098 -19.496318,-20.04294 -13.665644,-3.46196 -51.38282,-0.54663 -55.573617,0.18221 z"
                        />
                        <path
                            id="path19"
                            style={{
                                fill: "none",
                                fillOpacity: 1,
                                fillRule: "evenodd",
                                stroke: "#000000",
                                strokeWidth: 0.621726,
                                strokeDasharray: "none",
                                strokeOpacity: 1,
                            }}
                            d="M 77.62,160.97714 H 58.67 l 0.18,14.58 h 19.13 c 0,0 7.83,-1.64 7.11,-7.11 -0.73,-5.47 -1.09,-5.47 -7.47,-7.47 z"
                        />
                    </g>

                    {/* C */}
                    <g
                        id="layer4"
                        ref={CIDRef}
                        transform="matrix(2.1216016,0,0,2.1216016,-42.26434,-147.86092)"
                    >
                        <path
                            id="path21"
                            style={{
                                fill: "none",
                                fillOpacity: 1,
                                fillRule: "evenodd",
                                stroke: "#000000",
                                strokeWidth: 0.621726,
                                strokeDasharray: "none",
                                strokeOpacity: 1,
                            }}
                            d="m 65.595092,108.13794 19.541871,0.3644 c 1.195298,-2.60777 1.413671,-3.98433 6.513956,-4.19078 l 31.339881,0.54662 c 2.1865,0.76768 4.37301,0.64626 6.55951,5.10184 2.34656,4.605 3.24224,8.53284 9.83926,7.47055 3.39199,-1.19095 7.8154,1.74381 8.01718,-12.20797 l -6.92393,-29.335582 c -2.77481,-2.577516 -3.21455,-5.93339 -15.66994,-5.284049 l -4.1908,4.008588 -27.6957,-0.364416 -4.555216,-4.1908 C 82.647286,69.58716 74.725601,72.363824 72.701227,75.340392 Z"
                        />
                        <path
                            id="path22"
                            style={{
                                fill: "none",
                                fillOpacity: 1,
                                fillRule: "evenodd",
                                stroke: "#000000",
                                strokeWidth: 0.443581,
                                strokeDasharray: "none",
                                strokeOpacity: 1,
                            }}
                            d="m 77.014664,84.161393 v 4.831538 h 4.606063 v 4.67048 h 4.573854 v -4.79932 h 4.767115 v -4.702698 h -4.831535 v -4.606062 h -4.090699 v 4.670483 z"
                        />
                        <g id="g5">
                            <path
                                id="path23"
                                style={{
                                    fill: "none",
                                    fillOpacity: 1,
                                    fillRule: "evenodd",
                                    stroke: "#000000",
                                    strokeWidth: 0.336694,
                                    strokeDasharray: "none",
                                    strokeOpacity: 1,
                                }}
                                d="m 100.05529,86.660101 h 3.82638 l -2.02707,-2.778682 z"
                            />
                            <path
                                id="path24"
                                style={{
                                    fill: "none",
                                    fillOpacity: 1,
                                    fillRule: "evenodd",
                                    stroke: "#000000",
                                    strokeWidth: 0.336694,
                                    strokeDasharray: "none",
                                    strokeOpacity: 1,
                                }}
                                d="m 108.50521,84.746911 v 1.86764 h 3.87194 v -1.86764 z"
                            />
                        </g>

                        <g id="g4">
                            <path
                                id="path25"
                                transform="translate(0,-14.852859)"
                                style={{
                                    fill: "none",
                                    fillOpacity: 1,
                                    fillRule: "evenodd",
                                    stroke: "#000000",
                                    strokeWidth: 0.265378,
                                    strokeDasharray: "none",
                                    strokeOpacity: 1,
                                }}
                                d="m 120.8954,100.85245 c 0.007,-0.5804 0.22181,-1.157144 0.6006,-1.596962 0.37878,-0.439819 0.91977,-0.738187 1.4948,-0.8173 0.68368,-0.09406 1.40272,0.128201 1.9199,0.585133 0.51717,0.456932 0.82566,1.139089 0.836,1.829129 0.01,0.64124 -0.23654,1.28413 -0.67752,1.74976 -0.44097,0.46564 -1.07272,0.74696 -1.71397,0.75561 -0.65226,0.009 -1.30199,-0.26507 -1.75705,-0.73244 -0.45506,-0.46738 -0.711,-1.12066 -0.70276,-1.77293 z"
                            />
                            <path
                                id="path25-5"
                                transform="translate(5.6513311,-20.194576)"
                                style={{
                                    fill: "none",
                                    fillOpacity: 1,
                                    fillRule: "evenodd",
                                    stroke: "#000000",
                                    strokeWidth: 0.265378,
                                    strokeDasharray: "none",
                                    strokeOpacity: 1,
                                }}
                                d="m 120.8954,100.85245 c 0.007,-0.5804 0.22181,-1.157144 0.6006,-1.596962 0.37878,-0.439819 0.91977,-0.738187 1.4948,-0.8173 0.68368,-0.09406 1.40272,0.128201 1.9199,0.585133 0.51717,0.456932 0.82566,1.139089 0.836,1.829129 0.01,0.64124 -0.23654,1.28413 -0.67752,1.74976 -0.44097,0.46564 -1.07272,0.74696 -1.71397,0.75561 -0.65226,0.009 -1.30199,-0.26507 -1.75705,-0.73244 -0.45506,-0.46738 -0.711,-1.12066 -0.70276,-1.77293 z"
                            />
                            <path
                                id="path25-5-2"
                                transform="translate(10.894034,-14.900688)"
                                style={{
                                    fill: "none",
                                    fillOpacity: 1,
                                    fillRule: "evenodd",
                                    stroke: "#000000",
                                    strokeWidth: 0.265378,
                                    strokeDasharray: "none",
                                    strokeOpacity: 1,
                                }}
                                d="m 120.8954,100.85245 c 0.007,-0.5804 0.22181,-1.157144 0.6006,-1.596962 0.37878,-0.439819 0.91977,-0.738187 1.4948,-0.8173 0.68368,-0.09406 1.40272,0.128201 1.9199,0.585133 0.51717,0.456932 0.82566,1.139089 0.836,1.829129 0.01,0.64124 -0.23654,1.28413 -0.67752,1.74976 -0.44097,0.46564 -1.07272,0.74696 -1.71397,0.75561 -0.65226,0.009 -1.30199,-0.26507 -1.75705,-0.73244 -0.45506,-0.46738 -0.711,-1.12066 -0.70276,-1.77293 z"
                            />
                            <path
                                id="path25-5-2-3"
                                transform="translate(5.5925288,-9.4681581)"
                                style={{
                                    fill: "none",
                                    fillOpacity: 1,
                                    fillRule: "evenodd",
                                    stroke: "#000000",
                                    strokeWidth: 0.265378,
                                    strokeDasharray: "none",
                                    strokeOpacity: 1,
                                }}
                                d="m 120.8954,100.85245 c 0.007,-0.5804 0.22181,-1.157144 0.6006,-1.596962 0.37878,-0.439819 0.91977,-0.738187 1.4948,-0.8173 0.68368,-0.09406 1.40272,0.128201 1.9199,0.585133 0.51717,0.456932 0.82566,1.139089 0.836,1.829129 0.01,0.64124 -0.23654,1.28413 -0.67752,1.74976 -0.44097,0.46564 -1.07272,0.74696 -1.71397,0.75561 -0.65226,0.009 -1.30199,-0.26507 -1.75705,-0.73244 -0.45506,-0.46738 -0.711,-1.12066 -0.70276,-1.77293 z"
                            />
                        </g>

                        <g id="g3">
                            <path
                                id="path25-5-2-3-5"
                                transform="matrix(2.0121082,0,0,2.0121082,-152.53422,-106.56947)"
                                style={{
                                    fill: "none",
                                    fillOpacity: 1,
                                    fillRule: "evenodd",
                                    stroke: "#000000",
                                    strokeWidth: 0.176717,
                                    strokeDasharray: "none",
                                    strokeOpacity: 1,
                                }}
                                d="m 120.8954,100.85245 c 0.007,-0.5804 0.22181,-1.157144 0.6006,-1.596962 0.37878,-0.439819 0.91977,-0.738187 1.4948,-0.8173 0.68368,-0.09406 1.40272,0.128201 1.9199,0.585133 0.51717,0.456932 0.82566,1.139089 0.836,1.829129 0.01,0.64124 -0.23654,1.28413 -0.67752,1.74976 -0.44097,0.46564 -1.07272,0.74696 -1.71397,0.75561 -0.65226,0.009 -1.30199,-0.26507 -1.75705,-0.73244 -0.45506,-0.46738 -0.711,-1.12066 -0.70276,-1.77293 z"
                            />
                            <path
                                id="path25-5-2-3-5-2"
                                transform="matrix(2.0121082,0,0,2.0121082,-130.48065,-106.72383)"
                                style={{
                                    fill: "none",
                                    fillOpacity: 1,
                                    fillRule: "evenodd",
                                    stroke: "#000000",
                                    strokeWidth: 0.176717,
                                    strokeDasharray: "none",
                                    strokeOpacity: 1,
                                }}
                                d="m 120.8954,100.85245 c 0.007,-0.5804 0.22181,-1.157144 0.6006,-1.596962 0.37878,-0.439819 0.91977,-0.738187 1.4948,-0.8173 0.68368,-0.09406 1.40272,0.128201 1.9199,0.585133 0.51717,0.456932 0.82566,1.139089 0.836,1.829129 0.01,0.64124 -0.23654,1.28413 -0.67752,1.74976 -0.44097,0.46564 -1.07272,0.74696 -1.71397,0.75561 -0.65226,0.009 -1.30199,-0.26507 -1.75705,-0.73244 -0.45506,-0.46738 -0.711,-1.12066 -0.70276,-1.77293 z"
                            />
                            <rect
                                id="rect25"
                                style={{
                                    fill: "none",
                                    fillOpacity: 1,
                                    fillRule: "evenodd",
                                    stroke: "#000000",
                                    strokeWidth: 0.265378,
                                    strokeDasharray: "none",
                                    strokeOpacity: 1,
                                }}
                                width={4.2266541}
                                height={4.1687551}
                                x={93.478539}
                                y={94.28746}
                            />
                        </g>
                    </g>

                    {/* N */}
                    <g id="layer5" transform="translate(-11.257901,-52.833575)">
                        <g id="g2" ref={NIDRef}>
                            <path
                                id="path26"
                                style={{
                                    fill: "none",
                                    fillOpacity: 1,
                                    fillRule: "evenodd",
                                    stroke: "#000000",
                                    strokeOpacity: 1,
                                }}
                                d="m 198.06437,143.59667 v 80.46365 l -11.03598,6.37162 12.75139,22.08605 44.70593,-21.64921 44.56448,-0.61895 1.2379,-6.80846 -53.2298,-80.46365 z"
                            />
                            <path
                                id="path27"
                                style={{
                                    fill: "none",
                                    fillOpacity: 1,
                                    fillRule: "evenodd",
                                    stroke: "#000000",
                                    strokeOpacity: 1,
                                }}
                                d="m 202.39703,267.3869 -4.95161,27.23385 v 22.9012 l 43.01711,-0.30948 -0.30948,-40.5413 h -14.85483 l -9.59374,-9.90322 z"
                            />
                            <path
                                id="path28"
                                style={{
                                    fill: "none",
                                    fillOpacity: 1,
                                    fillRule: "evenodd",
                                    stroke: "#000000",
                                    strokeOpacity: 1,
                                }}
                                d="m 202.70651,258.41211 0.30947,4.95161 13.30745,-0.61895 9.28427,10.21269 h 14.54535 v -5.57056 h -10.21269 l -10.83165,-10.83164 z"
                            />
                            <path
                                id="path29"
                                style={{
                                    fill: "none",
                                    fillOpacity: 1,
                                    fillRule: "evenodd",
                                    stroke: "#000000",
                                    strokeOpacity: 1,
                                }}
                                d="m 220.34661,252.53207 19.18749,-9.59374 v 21.35382 h -8.66532 z"
                            />
                            <path
                                id="path30"
                                style={{
                                    fill: "none",
                                    fillOpacity: 1,
                                    fillRule: "evenodd",
                                    stroke: "#000000",
                                    strokeOpacity: 1,
                                }}
                                d="m 247.58046,233.65406 53.2298,83.24893 36.8276,-0.30947 1.2379,-97.17533 -21.66329,-0.30948 -24.75805,22.59172 h -15.1643 c -1.25236,2.60738 -2.69769,4.86945 -5.88004,4.02318 -3.42922,-1.28532 -3.96976,-3.05208 -3.7137,-4.95161 1.41538,-4.01658 2.70495,-3.50384 4.02318,-4.02318 1.79199,-0.0167 3.15688,0.53613 3.71371,2.16633 h 15.78325 l 4.02318,-6.18951 -2.4758,-3.40423 -3.40423,4.33265 z"
                            />
                            <path
                                id="path31"
                                style={{
                                    fill: "none",
                                    fillOpacity: 1,
                                    fillRule: "evenodd",
                                    stroke: "#000000",
                                    strokeOpacity: 1,
                                }}
                                d="m 297.09656,205.18231 18.25906,-12.99797 23.52014,-20.73487 0.92843,34.04232 h -28.47176 l -2.16633,5.57056 -11.45059,8.66531 z"
                            />
                            <path
                                id="path32"
                                style={{
                                    fill: "none",
                                    fillOpacity: 1,
                                    fillRule: "evenodd",
                                    stroke: "#000000",
                                    strokeOpacity: 1,
                                }}
                                d="m 296.16813,227.46455 2.78528,4.02318 16.09273,-15.78325 h 24.75805 l -0.30948,-5.57056 -24.44857,-0.30948 z"
                            />
                        </g>

                        <g id="g1" ref={NID2Ref}>
                            <path
                                id="path33"
                                style={{
                                    fill: "none",
                                    fillOpacity: 1,
                                    fillRule: "evenodd",
                                    stroke: "#000000",
                                    strokeOpacity: 1,
                                }}
                                d="m 272.95746,180.73374 14.23588,19.49696 c 22.28705,-16.83802 44.50677,-33.83313 64.37092,-56.32456 9.48881,-12.03931 20.21211,-21.19813 22.59172,-49.825564 0.11637,-9.1112 -3.75262,-17.083724 -15.16431,-22.901192 -8.72712,-4.147017 -19.88038,-7.080965 -36.82759,-7.117939 l -40.5413,5.880036 29.70965,-0.309475 c 11.76088,1.133139 22.366,4.577779 30.01914,13.926401 4.58029,9.747548 2.91956,18.927733 -1.54738,27.852803 l -24.1391,33.42336 h -19.18748 l -0.30948,18.56854 z"
                            />
                            <path
                                id="path34"
                                style={{
                                    fill: "none",
                                    fillOpacity: 1,
                                    fillRule: "evenodd",
                                    stroke: "#000000",
                                    strokeOpacity: 1,
                                }}
                                d="m 26.305424,215.08553 -5.57056,15.78325 c 1.159077,6.58998 1.608598,13.53474 7.117938,17.94959 4.864919,2.83033 9.76947,6.01735 14.235877,5.26108 l 0.309476,23.82962 c -8.624032,-1.93911 -17.191289,-3.14014 -26.6149,-15.47378 -4.691212,-8.45939 -3.841571,-12.82337 -4.023183,-17.94958 5.369848,-21.6184 9.724776,-20.23194 14.545352,-29.40018 z"
                            />
                        </g>
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default Loader;
