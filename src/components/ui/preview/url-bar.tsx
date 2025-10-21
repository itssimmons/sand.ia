export default function UrlBar(
  props: React.HTMLAttributes<HTMLDivElement> & { uri: string }
) {
  return (
    <span
      className="rounded-lg flex items-center justify-center py-1 min-w-[300px] bg-gray text-sm text-gray-400 px-2 overflow-hidden text-ellipsis"
      {...props}
    >
      {props.uri}
    </span>
  );
}
