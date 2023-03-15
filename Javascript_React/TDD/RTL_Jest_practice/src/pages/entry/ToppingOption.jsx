import { useOrderDetails } from "../../contexts/OrderDetail";

export default function ToppingOption({ name, imagePath }) {
  const { updateItemCount } = useOrderDetails();
  const handleChange = (e) => {
    updateItemCount(name, e.target.checked ? 1 : 0, "toppings");
  };

  return (
    <>
      <div>
        <img
          style={{ width: "75%" }}
          src={`http://localhost:3030/${imagePath}`}
          alt={`${name} topping`}
        />
      </div>
      <div>
        <div>
          <input type="checkbox" aria-label={name} onChange={handleChange} />
        </div>
        <span>{name}</span>
      </div>
    </>
  );
}
