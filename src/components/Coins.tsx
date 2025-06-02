import { Cylinder } from "@react-three/drei";
import useStore from "../state/store";
import { useMemo } from "react";
import { Vector3 } from "three";

const Coins = () => {
  const expenses = useStore((state) => state.expenses);
  const usedCategories = useStore((state) => state.usedCategories);
  const dummyCats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const positions = useMemo(() => {
    // const startVector = new Vector3(0, 0, -3);
    const rotAxis = new Vector3(0, 1, 0);
    const interval = (2 * Math.PI) / 10;
    let currentAngle = (dummyCats.length - 1) * (interval / 2);
    const newPos = dummyCats.map((cat, index) => {
      const startVector = new Vector3(0, 0, -20);
      startVector.applyAxisAngle(rotAxis, currentAngle);
      currentAngle -= interval;
      return startVector;
    });
    return newPos;
  }, [usedCategories]);

  // DEBUG
  console.log("Pos = ", positions);
  return (
    <>
      {dummyCats.map((cat, index) => {
        return (
          <Cylinder
            position={positions[index]}
            args={[1, 1, expenses[0].amount * 2, 6]}
          >
            <meshStandardMaterial color="red" />
          </Cylinder>
        );
      })}
    </>
  );
};

export default Coins;
