import { Cylinder } from "@react-three/drei";
import useStore from "../state/store";

const Coins = () => {
  const expenses = useStore((state) => state.expenses);

  return (
    <Cylinder args={[1, 1, expenses[0].amount, 6]}>
      <meshStandardMaterial color="red" />
    </Cylinder>
  );
};

export default Coins;
