import { Suspense } from 'react'
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import hdri from '../assets/environment/christmas_photo_studio_01_1k.hdr'
import useExperience from '../hooks/useExperience'
import SuspenseLoader from './SuspenseLoader'
import Room from './Room'
import FadeHtml from './FadeHtml'

const Experience = () => {
    const {
        handleScreenClick,
        setActiveCamera,
        isActiveHtml,
        activeCamera,
        cameraRef,
        controlsRef,
        isMobile,
        positionSceneCurrent
    } = useExperience()
    return (
        <>
            {activeCamera && (
                <>

                    <PerspectiveCamera
                        ref={cameraRef}
                        makeDefault
                        fov={45}
                        position={[5.11, 4.77, 4.58]}
                        near={0.1}
                        far={1000}
                    />

                    <OrbitControls
                        ref={controlsRef}
                        target={[-2.2, 0.6, -1.8]}
                        enablePan={false}
                        enableZoom={false}
                        enableRotate={true}
                        maxPolarAngle={1.2}
                        minPolarAngle={1}
                        maxAzimuthAngle={1.1}
                        minAzimuthAngle={0.7}
                        makeDefault
                    />
                </>
            )}
            <Suspense fallback={<SuspenseLoader onLoaded={() => setActiveCamera(true)} />}>
                <color attach="background" args={["#000000"]} />
                <Environment
                    files={hdri}
                    environmentIntensity={1.2}
                />
                <Room clickMesh={handleScreenClick} />


                {isActiveHtml && (
                    <>
                        <FadeHtml position={[-0.383, 2.325, -2.81]} rotation={[0, 0, 0]} transform={isMobile ? false : true} center distanceFactor={0.38}>
                            <div
                                className={`bg-red-500 w-[1000px] lg:w-[1080px] h-[850px] lg:h-[650px] rounded-[2px] overflow-hidden custom-scroll ${positionSceneCurrent.current === 'pantallaProyectos' ? 'opacity-100' : 'opacity-0'}`}
                            >
                                <p className="text-[6px]">Proyectos</p>
                            </div>
                        </FadeHtml>

                        <FadeHtml position={[-1.22, 1.9087, -2.57]} rotation={[-0.40, 0.491, 0.19]} transform center distanceFactor={1.2}>
                            <div className={`bg-red-500 w-[40px] h-[75px] rounded-[2px] ${positionSceneCurrent.current === 'pantallaContact' ? 'opacity-100' : 'opacity-0'}`}>
                                <p className="text-[6px]">Contáctame</p>
                            </div>
                        </FadeHtml>

                        {/* [-3.320, 2.482, -0.513 */}
                        <FadeHtml position={[-3.320, 2.482, isMobile ? -0.3 : -0.513]} rotation={[0, 1.56, 0]} transform center distanceFactor={1.2}>
                            <div className={`bg-red-500 w-[900px] h-[650px] lg:w-[1130px] lg:h-[650px] rounded-[2px] text-white ${positionSceneCurrent.current === 'pantallaAbout' ? 'opacity-100' : 'opacity-0'}`}>
                                <p className="text-[6px]">About</p>
                            </div>
                        </FadeHtml>
                    </>
                )}
            </Suspense>
        </>

    )
}

export default Experience