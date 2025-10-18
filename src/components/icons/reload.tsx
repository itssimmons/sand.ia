export default function Reload({
  height = 18,
  width = 18,
  color = "#777",
  ...props
}: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
      style={{ height, width }}
      preserveAspectRatio="xMidYMid meet"
      color={color}
      fill="none"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={1.125}
        d="m14.063 5.203-.743-.864A6.731 6.731 0 0 0 8.437 2.25 6.752 6.752 0 0 0 1.688 9a6.752 6.752 0 0 0 13.116 2.25"
      />
      <path
        fill="currentColor"
        d="M16.312 3.425v3.888a.562.562 0 0 1-.562.562h-3.888a.562.562 0 0 1-.398-.96l3.888-3.888a.562.562 0 0 1 .96.398Z"
      />
    </svg>
  );
}
