import { useOrderDetails } from "../../contexts/OrderDetail";

export default function ScoopOptions({ name, imagePath }) {
  const { updateItemCount } = useOrderDetails();
  const handleChange = (e) =>
    updateItemCount(name, parseInt(e.target.value), "scoops");

  return (
    <div style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <div style={{ marginTop: "10px" }}>
        <span style={{ textAlign: "right" }}>{name}</span>
        <div style={{ textAlign: "left" }}>
          <input
            type="number"
            role="spinbutton"
            aria-label={name}
            defaultValue={0}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
