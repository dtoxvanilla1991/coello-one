import React from "react";

interface EmptyBagIconProps {
  width?: number;
  height?: number;
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
}

const EmptyBagIcon: React.FC<EmptyBagIconProps> = ({
  width = 64,
  height = 64,
  fillColor = "#cccccc",
  strokeColor = "#999999",
  strokeWidth = 2,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      {/* Bag body */}
      <path
        d="M16 24H48L56 56H8L16 24Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      {/* Bag handle */}
      <path
        d="M24 24V18C24 13.58 27.58 10 32 10C36.42 10 40 13.58 40 18V24"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default EmptyBagIcon;
