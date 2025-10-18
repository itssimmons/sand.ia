export default function MagnifyingGlass({
  height = 22,
  width = 22,
  color = "#777",
  ...props
}: React.SVGProps<SVGSVGElement>) {
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
        d="m14.272 13.168-2.94-2.94A5.431 5.431 0 0 0 12.42 6.96c0-3.01-2.45-5.46-5.46-5.46S1.5 3.95 1.5 6.96s2.45 5.46 5.46 5.46a5.431 5.431 0 0 0 3.268-1.089l2.94 2.94a.782.782 0 0 0 1.104-1.103ZM3.06 6.96a3.9 3.9 0 1 1 7.8 0 3.9 3.9 0 0 1-7.8 0Z"
      />
    </svg>
  );
}
