import React, { useState } from "react";
import { MDBInput, MDBIcon } from "mdb-react-ui-kit";

const PasswordInput = ({ label, id, wrapperClass, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={wrapperClass}>
      <div className="input-group">
        <MDBInput
          label={label}
          id={id}
          type={showPassword ? "text" : "password"}
          {...props}
        />
        <span
          className="input-group-text"
          onClick={togglePasswordVisibility}
          style={{ cursor: "pointer" }}
        >
          <MDBIcon icon={showPassword ? "eye-slash" : "eye"} />
        </span>
      </div>
    </div>
  );
};

export default PasswordInput;
