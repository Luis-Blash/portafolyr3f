import { Leva } from "leva";
import { Canvas } from "@react-three/fiber";
import { useNavigation } from "../context/NavigationContext";
import Experience from "./Experience";
import Loader from "./Loader";

const CanvasR3F = () => {
  const { activeBack, setMoveDefault, setPositionName } = useNavigation();
  return (
    <>
      <Leva collapsed={false} />
      {activeBack ? (
        <div onClick={() => setMoveDefault(true)} className="fixed z-30 top-10 left-10 w-[100px] h-[100px] bg-red-500 rounded-full cursor-pointer px-4">
          <svg
            className="w-full h-full"
            viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M8 10L8 14L6 14L-2.62268e-07 8L6 2L8 2L8 6L16 6L16 10L8 10Z" fill="#000000"></path>
            </g>
          </svg>
        </div>
      ) : (
        <div className="fixed z-30 top-10 left-10 w-[100px] cursor-pointer flex flex-col gap-6">
          <div onClick={() => setPositionName("pantallaAbout")} className="gradient bg-gradient-to-r from-purple-600 to-red-600 rounded-2xl cursor-pointer px-4 py-2">
            <p className="font-bold text-white">About</p>
          </div>
          <div onClick={() => setPositionName("pantallaContact")} className="gradient bg-gradient-to-r from-purple-600 to-red-600 rounded-2xl cursor-pointer px-4 py-2">
            <p className="font-bold text-white">Contacts</p>
          </div>
          <div onClick={() => setPositionName("pantallaProyectos")} className="gradient bg-gradient-to-r from-purple-600 to-red-600 rounded-2xl cursor-pointer px-4 py-2">
            <p className="font-bold text-white">Projects</p>
          </div>
        </div>
      )}
      <Loader />
      <Canvas className='fixed z-10 top-0 w-full h-full'>
        <Experience />
      </Canvas>
    </>
  );
}

export default CanvasR3F;
