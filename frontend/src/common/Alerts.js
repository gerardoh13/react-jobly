import React from "react";

function Alerts({msgs = []}) {
  return (
    <div className="alert alert-danger " role="alert">
      {msgs.map((msg) => (
        <p className="mb-0 small" key={msg}>
          {msg}
        </p>
      ))}
    </div>
  );
}
export default Alerts;
