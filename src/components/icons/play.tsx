export default function Play({
  height = 26,
  width = 26,
  color = "currentColor",
  ...props
}: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      style={{ height, width }}
      preserveAspectRatio="xMidYMid meet"
      color={color}
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M6.234 20.625c-.287 0-.57-.076-.82-.219a1.843 1.843 0 0 1-.912-1.609V5.203c0-.673.35-1.29.912-1.609a1.647 1.647 0 0 1 1.677.021l11.618 6.954a1.686 1.686 0 0 1 0 2.86l-11.62 6.956a1.664 1.664 0 0 1-.855.24Z"
      />
    </svg>
  );
}
