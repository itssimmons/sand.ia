import { Reload as ReloadIcon } from "../../icons";

export default function Reload(props: React.HTMLAttributes<HTMLButtonElement>) {
	return (
		<button {...props}>
			<ReloadIcon color='#777' />
		</button>
	);
}