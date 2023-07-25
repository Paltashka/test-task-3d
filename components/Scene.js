import React, {useRef, useState, useEffect} from 'react';
import {Canvas, useThree} from '@react-three/fiber';
import {OrbitControls, useGLTF} from '@react-three/drei';
import {Selection, Select, EffectComposer, Outline} from '@react-three/postprocessing';

function Model({url, ...props}) {
    const {scene} = useGLTF(url);
    const [hovered, setHovered] = useState(null);
    const [distance, setDistance] = useState(false);
    const [cameraMove, setCameraMove] = useState(false);

    const {camera} = useThree();

    useEffect(() => {
        const checkDistance = () => {
            if (camera.position.distanceTo({x: props.position[0], y: props.position[1], z: props.position[2]}) < 10) {
                setDistance(true);
            } else {
                setDistance(false);
            }
        };

        checkDistance();
        // Add an event listener to update the distance on camera move
        const handleCameraMove = () => {
            checkDistance();
            setCameraMove(!cameraMove);
        };

        window.addEventListener('mousemove', handleCameraMove);

        // Clean up the event listener
        return () => {
            window.removeEventListener('mousemove', handleCameraMove);
            setCameraMove(!cameraMove);

        };
    }, [camera.position, cameraMove]);

    return (
        <Select enabled={hovered}>
            <primitive
                object={scene}
                {...props}
                scale={[0.5, 0.5, 0.5]}
                onPointerOver={() => distance && setHovered(true)}
                onPointerOut={() => setHovered(false)}
            />
        </Select>
    );
}


function Scene() {
    return (
        <Canvas
            style={{height: '100vh',  background: "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)" }}
            dpr={[1, 2]}
            camera={{fov: 75, near: 0.1, far: 2000, position: [15, 1, -2]}}
            shadows={true}
        >
            <OrbitControls/>
            <ambientLight intensity={0.9}/>
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1}/>
            <pointLight position={[30, 10, 10]} intensity={1}/>
            <Selection>

                <EffectComposer multisampling={8} autoClear={false}>
                    <Outline blur visibleEdgeColor="green" edgeStrength={100} width={1000}/>
                </EffectComposer>
                <Model url="/bust-hi.glb" position={[7, 0, -2]}/>
                <Model url="/bust-hi2.glb" position={[0, 0, 7]}/>


            </Selection>

        </Canvas>
    );
}

export default Scene;


//
// import React, {useRef, useState, useEffect, forwardRef} from 'react';
// import {Canvas, useThree} from '@react-three/fiber';
// import {OrbitControls, useGLTF} from '@react-three/drei';
// import {Selection, EffectComposer, Outline} from '@react-three/postprocessing';
//
// const Model = forwardRef(({url, ...props}, ref) => {
//     const {scene} = useGLTF(url);
//
//     return (
//         <group ref={ref}>
//             <mesh {...props} scale={[0.5, 0.5, 0.5]}>
//                 <primitive object={scene}/>
//             </mesh>
//         </group>
//     );
// });
//
// function OutlineEffect({modelRef}) {
//     const {camera} = useThree();
//     const [showOutline, setShowOutline] = useState(false);
//
//     useEffect(() => {
//         if (camera && modelRef.current) {
//             const distance = camera.position.distanceTo(modelRef.current.position);
//             setShowOutline(distance < 10);
//         }
//     }, [camera, modelRef]);
//
//     return showOutline ? <Outline blur visibleEdgeColor="green" edgeStrength={100} width={1000}/> : null;
// }
//
// function Scene() {
//     const bust1Ref = useRef();
//     const bust2Ref = useRef();
//
//     return (
//         <Canvas style={{height: '100vh'}} dpr={[1, 2]} camera={{fov: 75, near: 0.1, far: 2000, position: [15, 1, -2]}}>
//             <OrbitControls/>
//             <ambientLight intensity={0.5}/>
//             <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1}/>
//             <pointLight position={[10, -10, 10]}/>
//             <Selection>
//                 <EffectComposer multisampling={8} autoClear={false}>
//                     {/* Wrap models and outline effect in a group */}
//                     <group>
//                         {/* Use the forwarded ref here */}
//                         <Model url="/bust-hi.glb" position={[7, 0, -2]} ref={bust1Ref}/>
//                         <Model url="/bust-hi2.glb" position={[0, 0, 7]} ref={bust2Ref}/>
//                         <OutlineEffect modelRef={bust1Ref}/>
//                         <OutlineEffect modelRef={bust2Ref}/>
//                     </group>
//                 </EffectComposer>
//             </Selection>
//         </Canvas>
//     );
// }
//
// export default Scene;
