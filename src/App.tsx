import { Canvas } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";

function App() {
  return (
    <>
      <Canvas>
        <ambientLight />
        <pointLight position={[1, 1, 1]} />
        <Box>
          <meshStandardMaterial color="red" />
        </Box>
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
