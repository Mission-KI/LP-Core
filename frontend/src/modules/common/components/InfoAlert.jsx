import React from "react";
import { InfoCircleFill } from "react-bootstrap-icons";

const InfoAlert = ({ text }) => {
  return (
    <div className="alert alert-primary d-flex regular" role="alert">
      <div className="ps-1 pe-3">
        <InfoCircleFill className="txt-primary h5 mb-0" />
      </div>
      <p className="mb-0">{text}</p>
    </div>
  );
};

export default InfoAlert;
