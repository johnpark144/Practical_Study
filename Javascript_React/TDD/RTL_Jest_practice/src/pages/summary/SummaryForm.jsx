import React, { useState } from "react";

function SummaryForm() {
  const [disabled, setDisabled] = useState(true);
  const [showPopover, setShowPopover] = useState(false);
  return (
    <>
      {showPopover ? <div>No ice cream will actually be delivered</div> : ""}
      <input onChange={() => setDisabled(!disabled)} type="checkbox" />
      <button
        onMouseOver={() => setShowPopover(true)}
        onMouseLeave={() => setShowPopover(false)}
        disabled={disabled}
      >
        Confirm order
      </button>
    </>
  );
}

export default SummaryForm;
