export default function Globe({
  height = 22,
  width = 22,
  color = "currentColor",
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
        strokeMiterlimit={10}
        d="M9 1.688a7.313 7.313 0 1 0 0 14.625A7.313 7.313 0 0 0 9 1.688Z"
      />
      <path
        stroke="currentColor"
        strokeMiterlimit={10}
        d="M9 1.688C6.96 1.688 5.04 4.962 5.04 9S6.958 16.313 9 16.313c2.042 0 3.961-3.275 3.961-7.313s-1.92-7.313-3.96-7.313Z"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.125 4.125C5.469 5.079 7.162 5.649 9 5.649s3.53-.57 4.875-1.524m0 9.75c-1.344-.954-3.037-1.523-4.875-1.523s-3.53.569-4.875 1.523"
      />
      <path
        stroke="currentColor"
        strokeMiterlimit={10}
        d="M9 1.688v14.624M16.313 9H1.688"
      />
    </svg>
  );
}
