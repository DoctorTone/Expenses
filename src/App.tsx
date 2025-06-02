import { Canvas } from "@react-three/fiber";
import { Stage, Sky, OrbitControls, Text, Plane } from "@react-three/drei";
import { SCENE } from "./state/Config";
import Menu from "./UI/Menu";
import Coins from "./components/Coins";
import useStore from "./state/store";
import Total from "./UI/Total";

function App() {
  const expenditureAdded = useStore((state) => state.expenditureAdded);

  return (
    <>
      <Canvas camera={{ position: SCENE.CAMERA_POSITION }}>
        <Sky
          distance={450000}
          sunPosition={[0, 1, 1]}
          inclination={0}
          azimuth={0.25}
        />
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
          <Plane args={[1000, 1000]} rotation-x={-Math.PI / 2}>
            <meshStandardMaterial color="#807e7c" />
          </Plane>
        </Stage>

        <OrbitControls
          makeDefault
          enablePan={true}
          enableRotate={true}
          enableDamping={true}
        />
      </Canvas>
      <Menu />
      <Total />
    </>
  );
}

export default App;
