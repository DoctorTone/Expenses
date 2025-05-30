import { Canvas } from "@react-three/fiber";
import { Stage, Cylinder, OrbitControls, Text } from "@react-three/drei";
import { SCENE } from "./state/Config";
import Menu from "./UI/Menu";
import useStore from "./state/store";

function App() {
  const expenditureAdded = useStore((state) => state.expenditureAdded);

  return (
    <>
      <Canvas camera={{ position: SCENE.CAMERA_POSITION }}>
        <color attach="background" args={["darkgray"]} />
        <Stage adjustCamera shadows="contact" environment="city">
          {!expenditureAdded && (
            <Text
              color="black"
              anchorX="center"
              anchorY="middle"
              position-y={1}
            >
              No expenditure
            </Text>
          )}
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
