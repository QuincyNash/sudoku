interface AuxControlProps {
	children: React.ReactNode;
	label: string;
	onClick: () => void;
}

function AuxControl(props: AuxControlProps) {
	return (
		<button
			aria-label={props.label}
			title={props.label}
			className="h-full aspect-square flex-center rounded-md border border-primary-300 border-opacity-50 outline-none bg-primary-500 bg-opacity-0 text-primary-500 transition-colors hover:bg-opacity-20"
			onClick={props.onClick}
		>
			<div className="w-2/3 h-2/3 flex-center">{props.children}</div>
		</button>
	);
}

export default AuxControl;
