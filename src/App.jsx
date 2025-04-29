import { useRef, useState } from "react";
import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";

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

function App() {
  return (
    <>
      <Canvas>
        <directionalLight position={[0, 0, 2]} intensity={0.5} />
        <ambientLight intensity={0.4} />

        <group position={[3, 0, 0]}>
          <Cube position={[0, 0, 0]} size={[1, 1, 1]} color={"pink"} />
          {/* <Cube position={[-2, 0, 0]} size={[1, 1, 1]} color={"orange"} />
          <Cube position={[0, 2, 0]} size={[1, 1, 1]} color={"red"} />
          <Cube position={[2, 0, 0]} size={[1, 1, 1]} color={"yellow"} />
          <Cube position={[0, -2, 0]} size={[1, 1, 1]} color={"brown"} /> */}
        </group>
        <Sphere position={[-2, 0, 0]} size={[1, 30, 30]} color={"red"} />
      </Canvas>
    </>
  );
}

export default App;
