export default function FolderOpen({
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
        d="M12.75 3H7.88a.747.747 0 0 1-.416-.125l-.87-.58A1.743 1.743 0 0 0 5.623 2H3.25A1.752 1.752 0 0 0 1.5 3.75v.75h13c0-.965-.785-1.5-1.75-1.5Zm.492 11H2.758a1.75 1.75 0 0 1-1.748-1.723L.506 7.128V7.12A1.5 1.5 0 0 1 2 5.5h12.003a1.5 1.5 0 0 1 1.494 1.62v.008l-.507 5.149A1.75 1.75 0 0 1 13.242 14Z"
      />
    </svg>
  );
}
