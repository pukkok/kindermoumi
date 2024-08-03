import React, { useRef, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import './Origami.css';

const OrigamiScene = ({ mode }) => {
  const mesh = useRef()
  const { camera } = useThree()
  const [dragging, setDragging] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [folded, setFolded] = useState(false)
  const [foldFactor, setFoldFactor] = useState(0)

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

      setFoldFactor((prev) => Math.min(1, Math.max(0, prev + movementY * 0.01)));
    }
  };

  const handleDoubleClick = () => {
    if (mode === 'fold') {
      setFolded(!folded);
    }
  };

  const vertices = new Float32Array([
    -2, 0, 2,   // 좌상단
    2, 0, 2,    // 우상단
    2, 0, -2,   // 우하단
    -2, 0, -2,  // 좌하단
  ])

  const indices = [
    0, 1, 4, // 앞면
    1, 2, 4, // 오른쪽
    2, 3, 4, // 뒷면
    3, 0, 4  // 왼쪽
  ];

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(indices)
  geometry.computeVertexNormals()

  useFrame(() => {
    if (mesh.current) {
      if (mode === 'fold') {
        mesh.current.rotation.x = rotation.x;
        mesh.current.rotation.y = rotation.y;

        const position = mesh.current.geometry.attributes.position.array;

        for (let i = 0; i < position.length; i += 3) {
          const yFactor = position[i + 1] > 0 ? foldFactor : -foldFactor;
          position[i + 1] = yFactor;
        }

        mesh.current.geometry.attributes.position.needsUpdate = true;
        mesh.current.geometry.computeVertexNormals();
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
        geometry={geometry}
      >
        <meshStandardMaterial color="#ff0000" side={THREE.DoubleSide} />
      </mesh>
      <OrbitControls enabled={mode === 'move'} enablePan={true} enableZoom={true} enableRotate={true} />
    </>
  );
};

export default OrigamiScene;
