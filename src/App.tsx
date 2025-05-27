import { Canvas } from "@react-three/fiber";
import { Stage, Cylinder, OrbitControls, Box } from "@react-three/drei";
import { SCENE } from "./state/Config";

function App() {
  return (
    <>
      <Canvas camera={{ position: SCENE.CAMERA_POSITION }}>
        <color attach="background" args={["skyblue"]} />
        <Stage adjustCamera shadows="contact" environment="city">
          <Cylinder args={[5, 5, 0.5, 64, 1]}>
            <meshStandardMaterial color="yellow" />
          </Cylinder>
        </Stage>

        <OrbitControls
          makeDefault
          enablePan={true}
          enableRotate={true}
          enableDamping={true}
        />
      </Canvas>
    </>
  );
}

export default App;
