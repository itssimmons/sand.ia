export default function Webview(props: React.IframeHTMLAttributes<HTMLIFrameElement>) {
	return <iframe className="w-full h-full" {...props} />;
}