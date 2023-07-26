import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Selection, EffectComposer } from '@react-three/postprocessing';
import Model from './Model';

function Scene() {
    const [scrollPercentage, setScrollPercentage] = useState(0);

    // Update the scroll percentage on scroll
    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const percentage = (scrollTop / scrollHeight) * 100;
        setScrollPercentage(percentage);
    };

    useEffect(() => {
        // Add the scroll event listener on mount
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Calculate the new camera position based on the scroll percentage
    const cameraPositionX = 17; // Initial camera position X
    const cameraPositionY = 3; // Initial camera position Y
    const cameraPositionZ = -2 + scrollPercentage * 0.1; // Adjust the camera position Z based on scrollPercentage

    return (
        <Canvas
            style={{ height: '100vh', background: 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)' }}
            dpr={[1, 2]}
            camera={{ fov: 75, near: 0.1, far: 2000, position: [cameraPositionX, cameraPositionY, cameraPositionZ] }}
            shadows={true}
        >
            <OrbitControls enableRotate={false} />
            <ambientLight intensity={0.9} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[30, 10, 10]} intensity={1} />
            <Selection>
                <EffectComposer multisampling={8} autoClear={false}>
                    <Model url="/bust-hi.glb" position={[7, 0, -2]} />
                    <Model url="/bust-hi2.glb" position={[0, 0, 7]} />
                </EffectComposer>
            </Selection>
        </Canvas>
    );
}

export default Scene;
