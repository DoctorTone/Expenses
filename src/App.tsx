import { Canvas } from "@react-three/fiber";
import { Stage, Cylinder, OrbitControls, Text, Plane } from "@react-three/drei";
import { SCENE } from "./state/Config";
import Menu from "./UI/Menu";
import Coins from "./components/Coins";
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
          {expenditureAdded && <Coins />}
          {/* <Plane args={[100, 100]} rotation-x={-Math.PI / 2}>
            <meshStandardMaterial color="yellow" />
          </Plane> */}
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
