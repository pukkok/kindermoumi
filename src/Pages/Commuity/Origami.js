import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import OrigamiScene from './OrigamiScene';
import './Origami.css';

const Origami = () => {
  const [mode, setMode] = useState('move');

  const handleMoveClick = () => {
    setMode('move');
  };

  const handleFoldClick = () => {
    setMode('fold');
  };

  return (
    <section className='origami'>
      <div className='paper'>
        <Canvas style={{ height: "100%" }}>
          <OrigamiScene mode={mode} />
        </Canvas>
      </div>
      <div className='btn-box'>
        <button onClick={handleMoveClick}>움직이기</button>
        <button onClick={handleFoldClick}>접기</button>
      </div>
    </section>
  );
};

export default Origami;
