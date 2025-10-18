export default function SidebarCollapsableRightIcon({
  height = 24,
  width = 24,
  color = "#777",
  ...props
}: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      style={{ height, width }}
      preserveAspectRatio="xMidYMid meet"
      color={color}
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M15 2.5a2.5 2.5 0 0 1 2.496 2.353L17.5 5v10a2.5 2.5 0 0 1-2.353 2.496L15 17.5H5a2.5 2.5 0 0 1-2.496-2.353L2.5 15V5a2.5 2.5 0 0 1 2.353-2.496L5 2.5h10Zm-2.5 1.667H5a.833.833 0 0 0-.827.736L4.167 5v10a.833.833 0 0 0 .736.828l.097.005h7.5V4.167ZM9.756 7.744a.833.833 0 0 1 .069 1.1l-.07.079L8.68 10l1.077 1.078a.833.833 0 0 1 .069 1.1l-.07.078a.833.833 0 0 1-1.1.069l-.077-.07L6.91 10.59a.833.833 0 0 1-.07-1.1l.07-.078 1.667-1.667a.833.833 0 0 1 1.178 0Z"
      />
    </svg>
  );
}
