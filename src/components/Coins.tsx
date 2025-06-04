import { Cylinder, Text } from "@react-three/drei";
import useStore from "../state/store";
import { useMemo } from "react";
import { Vector3 } from "three";

const Coins = () => {
  const expenses = useStore((state) => state.expenses);
  const usedCategories = useStore((state) => state.usedCategories);
  const expenseTotals = useStore((state) => state.expenseTotals);

  const positions = useMemo(() => {
    // const startVector = new Vector3(0, 0, -3);
    const rotAxis = new Vector3(0, 1, 0);
    const interval = (2 * Math.PI) / 10;
    let currentAngle = (usedCategories - 1) * (interval / 2);
    const positions = [];
    for (let i = 0; i < usedCategories; ++i) {
      const startVector = new Vector3(0, 0, -20);
      startVector.applyAxisAngle(rotAxis, currentAngle);
      currentAngle -= interval;
      positions.push(startVector);
    }
    return positions;
  }, [usedCategories]);

  // DEBUG
  console.log("Pos = ", positions);
  return (
    <>
      {Object.keys(expenseTotals).map((key, index) => {
        return (
          <>
            <Cylinder
              position={positions[index]}
              args={[1, 1, expenseTotals[key] * 2, 6]}
            >
              <meshStandardMaterial color="red" />
            </Cylinder>
            <Text
              color="black"
              anchorX="center"
              anchorY="middle"
              position={[
                positions[index].x,
                expenseTotals[key] + 1,
                positions[index].z,
              ]}
            >
              {key}
            </Text>
          </>
        );
      })}
    </>
  );
};

export default Coins;
