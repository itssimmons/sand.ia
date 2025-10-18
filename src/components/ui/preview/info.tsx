import { Globe } from "../../icons";

export default function Info(props: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props}>
      <Globe />
    </button>
  );
}
