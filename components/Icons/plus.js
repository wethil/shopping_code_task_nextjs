import * as React from "react"

const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    viewBox="0 0 36 36"
    {...props}
  >
    <path
      fill="#31373D"
      d="M31 15H21V5a3 3 0 1 0-6 0v10H5a3 3 0 1 0 0 6h10v10a3 3 0 1 0 6 0V21h10a3 3 0 1 0 0-6z"
    />
  </svg>
)

export default SvgComponent
