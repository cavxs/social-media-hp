const Pen = ({ color, width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      //   xmlns:svgjs="http://svgjs.com/svgjs"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      x="0"
      y="0"
      viewBox="0 0 64 64"
      //   style="enable-background:new 0 0 512 512"
      xmlSpace="preserve"
    >
      <g>
        <path
          d="M11.105 43.597a2 2 0 0 1-1.414-3.414L40.945 8.929a2 2 0 1 1 2.828 2.828L12.519 43.011c-.39.39-.902.586-1.414.586z"
          fill={color}
        ></path>
        <path
          d="M8.017 58a2 2 0 0 1-1.957-2.42l3.09-14.403a2 2 0 1 1 3.911.839l-3.09 14.403A2 2 0 0 1 8.017 58zM22.418 54.91a2 2 0 0 1-1.414-3.414l31.254-31.253a2 2 0 1 1 2.828 2.828L23.833 54.324a1.994 1.994 0 0 1-1.415.586z"
          fill={color}
        ></path>
        <path
          d="M8.013 58a2.001 2.001 0 0 1-.418-3.956l14.403-3.09a2 2 0 0 1 .839 3.911l-14.403 3.09a1.958 1.958 0 0 1-.421.045zM48.015 29.313a1.99 1.99 0 0 1-1.414-.586L35.288 17.414a2 2 0 1 1 2.828-2.828l11.313 11.313a2 2 0 0 1-1.414 3.414zM53.672 23.657a2 2 0 0 1-1.415-3.415c1.113-1.113 1.726-2.62 1.726-4.242s-.613-3.129-1.726-4.242c-1.114-1.114-2.621-1.727-4.243-1.727s-3.129.613-4.242 1.727a2 2 0 1 1-2.829-2.829c1.868-1.869 4.379-2.898 7.071-2.898 2.691 0 5.203 1.029 7.071 2.898 1.869 1.868 2.898 4.379 2.898 7.071s-1.029 5.203-2.898 7.071a1.99 1.99 0 0 1-1.413.586z"
          fill={color}
        ></path>
      </g>
    </svg>
  );
};

export default Pen;
