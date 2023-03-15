import Options from "./Options";
import { useOrderDetails } from "./../../contexts/OrderDetail";
import { formatCurrency } from "./../../util/index";

export default function OrderEntry() {
  const { totals } = useOrderDetails();
  const grandTotal = formatCurrency(totals.scoops + totals.toppings);

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {grandTotal}</h2>
    </div>
  );
}
