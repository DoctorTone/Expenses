import { Canvas } from "@react-three/fiber";
import { Stage, Cylinder, OrbitControls, Text } from "@react-three/drei";
import { SCENE } from "./state/Config";
import Menu from "./UI/Menu";

function App() {
  return (
    <>
      <Canvas camera={{ position: SCENE.CAMERA_POSITION }}>
        <color attach="background" args={["darkgray"]} />
        <Stage adjustCamera shadows="contact" environment="city">
          <Text color="black" anchorX="center" anchorY="middle" position-y={1}>
            Add expenditure
          </Text>
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
      <Menu />
    </>
  );
}

export default App;
