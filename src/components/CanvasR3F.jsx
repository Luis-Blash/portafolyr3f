import { Leva } from "leva";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";

const CanvasR3F = () => {
 
  return (
    <>
      <Leva collapsed={false} />
      <Canvas className='fixed z-10 top-0 w-full h-full'>
        <Experience />
      </Canvas>
    </>
  );
}

export default CanvasR3F;
