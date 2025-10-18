export default function Chatbox({
  height = 22,
  width = 22,
  color = "#777",
  ...props
}: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      style={{ height, width }}
      preserveAspectRatio="xMidYMid meet"
      color={color}
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M4.5 14.5A.5.5 0 0 1 4 14v-2h-.75A2.253 2.253 0 0 1 1 9.75v-6A2.253 2.253 0 0 1 3.25 1.5h9.5A2.253 2.253 0 0 1 15 3.75v6A2.253 2.253 0 0 1 12.75 12H7.68l-2.86 2.384a.502.502 0 0 1-.32.116Z"
      />
    </svg>
  );
}
