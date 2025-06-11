import { Billboard, Cylinder, Text } from "@react-three/drei";
import useStore from "../state/store";
import { useMemo } from "react";
import { Vector3 } from "three";
import { SCENE } from "../state/Config";

const Coins = () => {
  const usedCategories = useStore((state) => state.usedCategories);
  const expenseTotals = useStore((state) => state.expenseTotals);

  const positions = useMemo(() => {
    // const startVector = new Vector3(0, 0, -3);
    const rotAxis = new Vector3(0, 1, 0);
    const interval = (2 * Math.PI) / 10;
    let currentAngle = (usedCategories.length - 1) * (interval / 2);
    const positions = [];
    for (let i = 0; i < usedCategories.length; ++i) {
      const startVector = new Vector3(0, 0, -SCENE.DISPLAY_RADIUS);
      startVector.applyAxisAngle(rotAxis, currentAngle);
      currentAngle -= interval;
      positions.push(startVector);
    }
    return positions;
  }, [usedCategories]);

  return (
    <>
      {Object.keys(expenseTotals).map((key, index) => {
        return (
          <group key={key}>
            <Cylinder
              position={[
                positions[index].x,
                positions[index].y + expenseTotals[key] / 2,
                positions[index].z,
              ]}
              args={[1, 1, expenseTotals[key], SCENE.SEGMENTS]}
            >
              <meshStandardMaterial color="red" />
            </Cylinder>
            <Billboard
              position={positions[index]}
              rotation={[0, 0, 0]}
              lockX={true}
              lockZ={true}
              lockY={false}
            >
              <Text
                color="black"
                anchorX="center"
                anchorY="middle"
                position-y={expenseTotals[key] + 2}
              >
                {key}
              </Text>
              <Text
                color="black"
                anchorX="center"
                anchorY="middle"
                position-y={expenseTotals[key] + 1}
              >
                {"£" + expenseTotals[key]}
              </Text>
            </Billboard>
          </group>
        );
      })}
    </>
  );
};

export default Coins;
