import Typography from "@mui/material/Typography";
import useStore from "../state/store";
import { MONTHS } from "../state/Config";

const Info = () => {
  const accountsName = useStore((state) => state.accountsName);
  let totalExpenditure = useStore((state) => state.totalExpenditure);
  const totalExpenditureString = totalExpenditure.toFixed(2);
  const total = parseFloat(totalExpenditureString);
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
        <Typography variant="h6">Total: £{total}</Typography>
      </div>
    </>
  );
};

export default Info;
