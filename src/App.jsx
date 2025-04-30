import { useRef, useState } from "react";
import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  MeshDistortMaterial,
  MeshWobbleMaterial,
  OrbitControls,
  useHelper,
} from "@react-three/drei";
import { DirectionalLightHelper } from "three";

const Cube = ({ position, size, color }) => {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta * 2;
    ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2;
  });

  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Sphere = ({ position, size, color }) => {
  const ref = useRef();

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const speed = isHovered ? 1.5 : 0.4;

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * speed;
  });
  return (
    <mesh
      position={position}
      ref={ref}
      onPointerEnter={(e) => (e.stopPropagation(), setIsHovered(true))}
      onPointerLeave={() => setIsHovered(false)}
      onClick={() => setIsClicked(!isClicked)}
      scale={isClicked ? 1.5 : 1}
    >
      <sphereGeometry args={size} />
      <meshStandardMaterial color={isHovered ? "yellow" : "red"} wireframe />
    </mesh>
  );
};

const TorusKnot = () => {
  return (
    <mesh>
      <torusKnotGeometry args={[0.8, 0.1, 16]} />
      <MeshWobbleMaterial factor={1} speed={10} />
      <OrbitControls />
    </mesh>
  );
};

const Scene = () => {
  const directionalLightRef = useRef();
  useHelper(directionalLightRef, DirectionalLightHelper, 0.5, "white");
  return (
    <>
      <directionalLight position={[0, 0, 2]} intensity={0.5} ref={directionalLightRef} />
      <ambientLight intensity={0.4} />

      <TorusKnot />

      <group position={[3, 0, 0]}>
        {/* <Cube position={[0, 0, 0]} size={[1, 1, 1]} color={"pink"} /> */}
        {/* <Cube position={[-2, 0, 0]} size={[1, 1, 1]} color={"orange"} />
          <Cube position={[0, 2, 0]} size={[1, 1, 1]} color={"red"} />
          <Cube position={[2, 0, 0]} size={[1, 1, 1]} color={"yellow"} />
          <Cube position={[0, -2, 0]} size={[1, 1, 1]} color={"brown"} /> */}
      </group>
      {/* <Sphere position={[-2, 0, 0]} size={[1, 30, 30]} color={"red"} /> */}
    </>
  );
};

function App() {
  return (
    <>
      <Canvas>
        <Scene />
      </Canvas>
    </>
  );
}

export default App;
