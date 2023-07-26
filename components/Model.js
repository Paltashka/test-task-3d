import {  useGLTF } from "@react-three/drei";
import React, { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { Select } from "@react-three/postprocessing";
import { Html } from "@react-three/drei";

function Model({ url, ...props }) {
    const { scene } = useGLTF(url);
    const [hovered, setHovered] = useState(false);
    const [distance, setDistance] = useState(false);
    const [distanceLength, setDistanceLength] = useState(0);
    const [modelSize, setModelSize] = useState({ width: 0, height: 0 });


    const { camera } = useThree();

    useEffect(() => {
        // Calculate the bounding box of the model
        scene.traverse(child => {
            if (child.isMesh) {
                child.geometry.computeBoundingBox();
                const box = child.geometry.boundingBox;
                if (box) {
                    const width = box.max.x - box.min.x;
                    const height = box.max.y - box.min.y;
                    setModelSize({ width, height });
                }
            }
        });
    }, [scene]);



    useEffect(() => {
        const checkDistance = () => {
            if (camera.position.distanceTo({ x: props.position[0], y: props.position[1], z: props.position[2] }) < 10) {
                setDistanceLength(camera.position.distanceTo({ x: props.position[0], y: props.position[1], z: props.position[2] }));
                console.log(distanceLength, "distanceLength");
                setDistance(true);
                setHovered(true);
            } else {
                setDistance(false);
                setHovered(false);
            }
        };

        checkDistance();
        // Add an event listener to update the distance on camera move
        const handleCameraMove = () => {
            checkDistance();
        };

        window.addEventListener('wheel', handleCameraMove);

        // Clean up the event listener
        return () => {
            window.removeEventListener('wheel', handleCameraMove);
        };
    }, [camera.position, props.position, distanceLength]);

    return (
        <Select enabled={hovered}>
            <group>
                {distance && (
                    <Html position={props.position}>
                        <div
                            style={{
                                width: `${modelSize.width * 50}px`, // Adjust the factor (50) to control the size of the square
                                height: `${modelSize.height * 40}px`,
                                marginTop: `-${modelSize.height * (35+(10-distanceLength))}px`,
                                marginLeft: `-${modelSize.width * 25}px`,
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: `scale(${(10-distanceLength)/2*1.1 > 0 ? (10-distanceLength)/2*1.1 : 0}) `,
                                border: '4px solid red',
                                zIndex: 1, // Set the zIndex to make sure the square is on top of the model
                            }}
                        />
                    </Html>
                )}
                <primitive object={scene} {...props} scale={[0.5, 0.5, 0.5]} />
            </group>
        </Select>
    );
}

export default Model;
