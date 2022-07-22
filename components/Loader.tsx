import CircularProgress from "@mui/material/CircularProgress";

interface LoaderProps {
	visible: boolean;
}

export default function Loader(props: LoaderProps) {
	if (!props.visible) return null;

	return (
		<div className="fixed top-0 left-0 w-full h-full flex-center z-[999999] bg-modal-light">
			<CircularProgress size="4rem"></CircularProgress>
		</div>
	);
}
