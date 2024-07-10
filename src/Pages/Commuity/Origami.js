import React, { useRef, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import './Origami.css'

const OrigamiScene = ({ mode }) => {
  const mesh = useRef();
  console.log(mode)
  const { camera } = useThree();
  const [dragging, setDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [folded, setFolded] = useState(false);

  const handlePointerDown = (event) => {
    if (mode === 'fold') {
      setDragging(true);
    }
  };

  const handlePointerUp = (event) => {
    setDragging(false);
  };

  const handlePointerMove = (event) => {
    if (dragging && mode === 'fold') {
      const { movementX, movementY } = event;
      setRotation((prev) => ({
        x: prev.x + movementY * 0.01,
        y: prev.y + movementX * 0.01,
      }));
    }
  };

  const handleDoubleClick = () => {
    if (mode === 'fold') {
      setFolded(!folded);
    }
  };

  useFrame(() => {
    if (mesh.current) {
      if (mode === 'fold') {
        mesh.current.rotation.x = rotation.x;
        mesh.current.rotation.y = rotation.y;
        if (folded) {
          mesh.current.scale.y = 0.5;
        } else {
          mesh.current.scale.y = 1;
        }
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh
        ref={mesh}
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onDoubleClick={handleDoubleClick}
      >
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial attachArray="material" color={'#ff0000'} side={THREE.FrontSide} />
        <meshStandardMaterial attachArray="material" color={'#0000ff'} side={THREE.BackSide} />
      </mesh>
      <OrbitControls enabled={mode === 'move'} enablePan={true} enableZoom={true} enableRotate={true} />
    </>
  );
};

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
