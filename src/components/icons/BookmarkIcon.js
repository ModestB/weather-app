import React from "react";

function BookmarkIcon({width = 20, height = 20, active}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={`icon-bookmark ${active ? 'active' : ''}`}
    >
      <g fillRule="evenodd" stroke="none" strokeWidth="1">
        <g transform="translate(-611 -263)">
          <path
            d="M617 265.913V286l6-5.74 6 5.74v-20.087c0-1.913-2-1.913-2-1.913h-8s-2 0-2 1.913z"
          ></path>
        </g>
      </g>
    </svg>
  );
}

export default BookmarkIcon;