

import { useGLTF } from '@react-three/drei'
import model from '../assets/models/Escritorio7.glb'

const Room = (props) => {
    const { nodes, materials } = useGLTF(model)
    const { clickMesh, ...groupProps } = props

    const overMesh = (e) => {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
    }

    const outMesh = (e) => {
        e.stopPropagation()
        document.body.style.cursor = 'default'
    }

    return (
        <group
            {...groupProps}
            dispose={null}
        >
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Mesa.geometry}
                material={materials.Atlas_material}
                position={[-0.325, 1.617, -2.359]}
                scale={[1.5, 0.1, 0.75]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Alfombra.geometry}
                material={materials.Atlas_material}
                position={[-0.325, 1.721, -1.966]}
                scale={[1.099, 0.009, 0.236]}
            />
            <group
                position={[0.732, 2.04, -2.656]}
                rotation={[0, -0.779, 0]}
                scale={[0.359, 0.138, 0.138]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube003.geometry}
                    material={materials.Atlas_material}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube003_1.geometry}
                    material={materials.PCDetalles}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube003_2.geometry}
                    material={materials.TransparentMaterial}
                />
            </group>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.BoteAgua.geometry}
                material={materials.Atlas_material}
                position={[-1.49, 2.012, -2.511]}
                scale={0.072}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.BaseTelefono.geometry}
                material={materials.Atlas_material}
                position={[-1.236, 1.829, -2.6]}
                rotation={[0, 0.512, -Math.PI]}
                scale={[-0.085, -0.115, -0.014]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Teclas.geometry}
                material={materials.Atlas_material}
                position={[-0.386, 1.74, -2.025]}
                scale={0.023}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.BaseDiorama.geometry}
                material={materials.Atlas_material}
                rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                scale={[3.435, 0.088, 3.185]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.MesaPequena.geometry}
                material={materials.Atlas_material}
                position={[-2.806, 1.2, -0.199]}
                rotation={[0, Math.PI / 2, 0]}
                scale={[0.637, 0.041, 0.487]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.PantallProyector.geometry}
                material={materials.detallePantallas}
                position={[-3.328, 2.482, -0.513]}
                rotation={[0, 0, -Math.PI / 2]}
                scale={[0.936, 1, 1.689]}
                onClick={(e) => clickMesh(e, { name: 'pantallaAbout' })}
                onPointerOver={(e) => overMesh(e)}
                onPointerOut={(e) => outMesh(e)}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Play.geometry}
                material={materials.Atlas_material}
                position={[-2.974, 1.333, -0.559]}
                rotation={[0, -0.428, 0]}
                scale={[0.147, 0.044, 0.173]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Silla.geometry}
                material={materials.Atlas_material}
                position={[-0.475, 0.863, -0.139]}
                rotation={[-Math.PI, 0.475, -Math.PI]}
                scale={0.337}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cuadro.geometry}
                material={materials.Atlas_material}
                position={[-1.863, 3.334, -2.901]}
                scale={[0.876, 0.36, 0.083]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.PantallaReloj.geometry}
                material={materials.detallePantallas}
                position={[-1.863, 3.334, -2.901]}
                scale={[0.876, 0.36, 0.083]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Imac.geometry}
                material={materials.Atlas_material}
                position={[-0.383, 1.931, -2.93]}
                rotation={[0, 0, -Math.PI]}
                scale={[-0.105, -0.39, -0.02]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.PantallaImac.geometry}
                material={materials.detallePantallas}
                position={[-0.383, 1.931, -2.93]}
                rotation={[0, 0, -Math.PI]}
                scale={[-0.105, -0.39, -0.02]}
                onClick={(e) => clickMesh(e, { name: 'pantallaProyectos' })}
                onPointerOver={(e) => overMesh(e)}
                onPointerOut={(e) => outMesh(e)}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.PantallaMovil.geometry}
                material={materials.detallePantallas}
                position={[-1.233, 1.896, -2.593]}
                rotation={[-0.315, 0.491, -2.989]}
                scale={[-0.06, -0.115, -0.014]}
                onClick={(e) => clickMesh(e, { name: 'pantallaContact' })}
                onPointerOver={(e) => overMesh(e)}
                onPointerOut={(e) => outMesh(e)}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Telefono.geometry}
                material={materials.Atlas_material}
                position={[-1.233, 1.896, -2.593]}
                rotation={[-0.315, 0.491, -2.989]}
                scale={[-0.06, -0.115, -0.014]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube.geometry}
                material={materials.Atlas_material}
                position={[-0.321, 3.399, -2.97]}
                scale={[0.241, 0.241, 0.087]}
            />
        </group>
    )
}

useGLTF.preload(model)


export default Room