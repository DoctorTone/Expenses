import Typography from "@mui/material/Typography";
import useStore from "../state/store";
import { MONTHS } from "../state/Config";

const Info = () => {
  const accountsName = useStore((state) => state.accountsName);
  const totalExpenditure = useStore((state) => state.totalExpenditure);
  const date = new Date();
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();

  return (
    <>
      <div id="total" className="panel">
        <Typography variant="h6">Accounts: {accountsName}</Typography>
        <Typography variant="h6">
          Date: {month} {year}
        </Typography>
        <Typography variant="h6">Total: £{totalExpenditure}</Typography>
      </div>
    </>
  );
};

export default Info;
