import React, { useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';

const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [close, setClose] = useState(false);
    const { progress } = useProgress();

    const handleClose = () => {
      setClose(true)
    }

    useEffect(() => {
        setIsLoading(progress < 100);
    }, [progress]);

    return (
        <div className={`preloader${isLoading ? ' active' : ''} ${close && ' close' }`}>
            <div className="progress-bar" style={{ width: `${progress}%` }}>{progress && progress}%</div>
            <button className="button" onClick={()=>handleClose()}>Start</button>
        </div>
    );
};

export default Preloader;
