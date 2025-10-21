export default function ArrowUpward({
  width = 22,
  height = 22,
  color = 'currentColor',
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 19 19"
      style={{ height: 22, width: 22 }}
      preserveAspectRatio="xMidYMid meet"
      color={color}
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M9.905 14.476v-8.51l3.718 3.718a.768.768 0 0 0 1.247-.247.76.76 0 0 0-.165-.828l-5.02-5.02a.759.759 0 0 0-1.075 0L3.58 8.602a.76.76 0 0 0 1.075 1.074l3.725-3.71v8.51c0 .42.343.762.762.762a.764.764 0 0 0 .762-.762Z"
      />
    </svg>
  );
}
