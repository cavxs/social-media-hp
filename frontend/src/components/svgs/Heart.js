const Heart = ({ filled, width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      viewBox="0 0 67.949 67.949"
      style={{ overflow: "visible" }}
      xmlSpace="preserve"
    >
      <g>
        <path
          d="M 62.49 11.239 c -7.39 -7.388 -19.412 -7.388 -26.8 0 l -1.716 1.715 l -1.715 -1.715 c -7.388 -7.389 -19.411 -7.389 -26.799 0 c -7.238 7.238 -7.285 18.711 -0.109 26.688 c 6.545 7.273 25.848 22.986 26.667 23.651 a 2.986 2.986 0 0 0 1.89 0.672 l 0.065 -0.001 c 0.688 0.032 1.381 -0.204 1.955 -0.671 c 0.819 -0.665 20.124 -16.378 26.671 -23.652 c 7.175 -7.976 7.128 -19.449 -0.109 -26.687 z z"
          fill={filled ? "red" : "transparent"}
          stroke={filled ? "transparent" : "red"}
          strokeWidth="5"
          //   fillRule="evenodd"
        ></path>
      </g>
    </svg>
  );
};

export default Heart;
