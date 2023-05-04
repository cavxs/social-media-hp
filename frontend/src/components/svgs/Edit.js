import React from "react";

const Edit = ({ filled, width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      x="0"
      y="0"
      viewBox="0 0 682.667 682.667"
      //   style="enable-background:new 0 0 512 512"
    >
      <g>
        <defs>
          <clipPath id="a" clipPathUnits="userSpaceOnUse">
            <path
              d="M0 512h512V0H0Z"
              fill={filled}
              data-original="#000000"
            ></path>
          </clipPath>
        </defs>
        <g
          clipPath="url(#a)"
          transform="matrix(1.33333 0 0 -1.33333 0 682.667)"
        >
          <path
            d="M0 0h-220c-22.092 0-40-17.908-40-40v-320c0-22.092 17.908-40 40-40h320c22.092 0 40 17.908 40 40v220"
            // style="stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1"
            transform="translate(275 415)"
            fill="none"
            stroke={filled}
            strokeWidth="30"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeDasharray="none"
            strokeOpacity=""
          ></path>
          <path
            d="m0 0-226.274-226.273-70.711-14.143 14.142 70.711L-56.569 56.569c7.81 7.81 20.474 7.81 28.284 0L0 28.284C7.81 20.474 7.81 7.811 0 0Z"
            // style="stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1"
            transform="translate(491.143 434.573)"
            fill="none"
            stroke={filled}
            strokeWidth="30"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeDasharray="none"
            strokeOpacity=""
          ></path>
          <path
            d="m0 0 56.568-56.568"
            // style="stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1"
            transform="translate(406.29 462.857)"
            fill="none"
            stroke={filled}
            strokeWidth="30"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeDasharray="none"
            strokeOpacity=""
          ></path>
        </g>
      </g>
    </svg>
  );
};

export default Edit;
