import React from "react";
import useQRCodeGenerator from "react-hook-qrcode-svg";

const QRCODE_SIZE = 100;
const QRCODE_LEVEL = "Q";
const QRCODE_BORDER = 4;

const QRCodeComponent = ({ value }) => {
  const { path, viewBox } = useQRCodeGenerator(
    value,
    QRCODE_LEVEL,
    QRCODE_BORDER
  );

  return (
    <svg
      width={QRCODE_SIZE}
      height={QRCODE_SIZE}
      viewBox={viewBox}
      stroke="none"
    >
      <rect width="100%" height="100%" fill="#ffffff" />
      <path d={path} fill="#000000" />
    </svg>
  );
};

export default QRCodeComponent